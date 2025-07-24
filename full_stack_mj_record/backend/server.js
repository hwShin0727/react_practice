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

const GameRecordSchema = new mongoose.Schema({
    game_id : {type : Number, required : true, unique : true},
    game_type : {type : String, required : true, default : "반장전"},
    played_at : {type : Date, required : true, default : Date.now},
    players : {
        type : [{player_wind : String, player_name : String, player_score : Number}],
        required : true
    },
    modified_at : {type : Date, required : false, default : Date.now},
    is_deleted : {type : Boolean, required : false, default : false}
});

const GameRecord = mongoose.model('GameRecord', GameRecordSchema);

// 모든 기록 목록
app.get('/game-records', async(req, res) => {
    const gameRecords = await GameRecord.find();
    res.json(gameRecords);
});

// 게임 기록 등록
app.post('/game-records', async(req, res) => {
    const {game_id, game_type, players} = req.body;
    const newGameRecord = new GameRecord({game_id, game_type, players});
    await newGameRecord.save();
    res.json({message : "기록 등록 완료"}); 
});

// 수정(삭제)
app.put('/game-records/:id', async (req, res) => {
  const { id } = req.params;
  const {game_id, game_type, players, modified_at, is_deleted} = req.body;
  await GameRecord.findByIdAndUpdate(id, {game_id, game_type, players, modified_at, is_deleted});
  if(is_deleted) {
    res.json({message : "기록 삭제 완료"});
  } else {
    res.json({message : "기록 수정 완료"});
  }
});

app.listen(5000, () => {
  console.log('🚀 서버 실행 중: http://localhost:5000');
})