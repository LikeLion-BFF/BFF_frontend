import React from 'react';
import '../style/Home/bingomain.scss';

const BingoMain: React.FC = () => {
  return (
    <div className="bingo-container">
      <div className="bingo-header">
        <h2>제목없음</h2>
        <p>(팀명)의 빙고</p>
      </div>
      <div className="bingo-background">
      <div className="bingo-grid">
        {Array(9).fill(null).map((_, index) => (
          <div key={index} className="bingo-cell"></div>
        ))}
        </div>
      </div>
      <div className="bingo-footer">
        <p>빙고칸을 눌러 빙고판을 채워보세요</p>
        <button className="download-button">⬇️</button>
      </div>
    </div>
  );
};

export default BingoMain;