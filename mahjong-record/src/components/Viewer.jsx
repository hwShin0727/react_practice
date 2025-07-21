const Viewer = ({ content }) => {
  
  return (
    <div className="Viewer">
      <section className="content_section">
        <h4>대국 결과</h4>
        <div className="content_wrapper">
          <p>{`동가 : ${content.eastName}, ${content.eastScore}점`}</p>
          <p>{`남가 : ${content.southName}, ${content.southScore}점`}</p>
          <p>{`서가 : ${content.westName}, ${content.westScore}점`}</p>
          <p>{`북가 : ${content.northName}, ${content.northScore}점`}</p>
          <p>{`점수 합계 : ${content.eastScore + content.southScore + content.westScore + content.northScore} 점`}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
