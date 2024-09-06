import React from 'react';
import '../style/Home/bingomain.scss';
import downloadIcon from '../assets/images/download.png';
import html2canvas from 'html2canvas';

const BingoMain: React.FC = () => {

  // 빙고판을 PNG로 저장하는 함수
  const handleDownloadClick = () => {
    const bingoElement = document.querySelector('.bingo-background') as HTMLElement; 
    if (bingoElement) {
      html2canvas(bingoElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); // 캔버스를 PNG로 변환
        link.download = 'bingo-board.png';        // 다운로드 파일 이름 설정
        link.click();                             // 다운로드 실행
      });
    }
  };

  const handleCellClick = (index: number) => {
    console.log(`${index + 1}번째 빙고 칸이 눌렸습니다.`);
  };

  return (
    <div className="bingo-container">
      <div className="bingo-header">
        <h2>제목없음</h2>
        <p>(팀명)의 빙고</p>
      </div>
      <div className="bingo-background">
        <div className="bingo-grid">
          {Array(9).fill(null).map((_, index) => (
            <button 
              key={index} 
              className="bingo-cell" 
              onClick={() => handleCellClick(index)}
            >
              {/* 빈 셀 */}
            </button>
          ))}
        </div>
      </div>
      <div className="bingo-footer">
        <p>
          빙고칸을 눌러 빙고판을 채워보세요
          <img 
            src={downloadIcon} 
            alt="download icon" 
            className="download-icon" 
            onClick={handleDownloadClick} // 다운로드 버튼에 클릭 이벤트 추가
            style={{ cursor: 'pointer' }} // 커서를 포인터로 변경
          />
        </p>
      </div>
    </div>
  );
};

export default BingoMain;