import './Button.css';

//text(저장, 취소, 수정), type("positive, negative"), onClick(콜백함수)
const Button = ({ text, type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`Button Button_${type}`}
    >
      {text}
    </button>
  );
};

export default Button;