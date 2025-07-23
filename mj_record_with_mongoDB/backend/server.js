const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mj_record', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

const GroupSchema = new mongoose.Schema({
  group_name : {type : String, required : true, unique : true},
  group_pw : {type : String, required : true},
});

const GameRecordSchema = new mongoose.Schema({
    group_name : {type : String, required : true},
    game_id : {type : Number, required : true, unique : true},
    game_type : {type : String, required : true, default : "반장전"},
    players : {
        type : [{player_name : String, player_score : Number}],
        required : true
    },
    modified_at : {type : Date, required : false, default : Date.now},
    is_deleted : {type : Boolean, required : false, default : false}
});

const Group = mongoose.model('Group', GroupSchema);
const GameRecord = mongoose.model('GameRecord', GameRecordSchema);

// 등록된 모든 단체 반환
app.get('/groups', async (req, res) => {
  const groups = await Group.find();
  res.json(groups);
});

// 단체 등록
app.post('/groups', async(req, res) => {
    const {group_name, group_pw} = req.body;
    const newGroup = new Group({group_name, group_pw});
    await newGroup.save();
    res.json({message : "단체 등록 완료"});
});

// 단체 정보 수정(비밀번호)
app.put('/groups/:id', async(req, res) => {
    const {id} = req.params;
    const {group_name, group_pw} = req.body;
    await Group.findByIdAndUpdate(id, {group_name, group_pw});
    res.json({message : "단체 정보 수정 완료"});
});

// 단체 삭제
app.delete('groups/:id', async(req, res) => {
    const {id} = req.params;
    await Group.findByIdAndDelete(id);
    res.json({message : "단체 삭제 완료"});
});

// 모든 기록 목록
app.get('/game-records', async(req, res) => {
    const gameRecords = await GameRecord.find();
    res.json(gameRecords);
});

// 게임 기록 등록
app.post('/game-records', async(req, res) => {
    const {group_name, game_id, game_type, players} = req.body;
    const newGameRecord = new GameRecord({group_name, game_id, game_type, players});
    await newGameRecord.save();
    res.json({message : "기록 등록 완료"}); 
});

// 수정(삭제)
app.put('/game-records/:id', async (req, res) => {
  const { id } = req.params;
  const {group_name, game_id, game_type, players, modified_at, is_deleted} = req.body;
  await Note.findByIdAndUpdate(id, {group_name, game_id, game_type, players, modified_at, is_deleted});
  if(is_deleted) {
    res.json({message : "기록 삭제 완료"});
  } else {
    res.json({message : "기록 수정 완료"});
  }
});

app.listen(5000, () => {
  console.log('🚀 서버 실행 중: http://localhost:5000');
})