import React, { useState } from 'react';
import '../style/Home/bingomain.scss';
import downloadIcon from '../assets/images/download.png';
import html2canvas from 'html2canvas';

const BingoMain: React.FC = () => {
  const [bingoStatus, setBingoStatus] = useState([true, true, false, false, false, false, false, false, false]);
  const [selectedCell, setSelectedCell] = useState<number | null>(null); // 선택된 칸의 인덱스 저장
  const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부 관리
  const [likeCount, setLikeCount] = useState(0); // 좋아요 카운트 상태
  const [hasLiked, setHasLiked] = useState(false); // 유저가 하트를 눌렀는지 추적

  // 빙고 칸 클릭 핸들러
  const handleCellClick = (index: number) => {
    if (bingoStatus[index]) {
      setSelectedCell(index); // 인증된 칸을 클릭하면 인덱스 저장
      setShowModal(true);     // 모달 창 표시
      setHasLiked(false);     // 새로운 칸을 클릭하면 다시 좋아요 초기화
    } else {
      console.log(`${index + 1}번째 빙고 칸은 아직 인증되지 않았습니다.`);
    }
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false); // 모달 창 닫기
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (!hasLiked) { // 한 번만 누를 수 있도록 제한
      setLikeCount(likeCount + 1); // 좋아요 카운트 증가
      setHasLiked(true); // 더 이상 누를 수 없도록 설정
    }
  };

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
              style={{ fontWeight: bingoStatus[index] ? 'bold' : 'normal' }} // 인증된 칸 글씨 bold 처리
            >
              칸 내용 {index + 1} {/* 예시로 칸 내용 */}
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
            onClick={handleDownloadClick} 
            style={{ cursor: 'pointer' }}
          />
        </p>
      </div>

      {/* 팝업 모달 */}
      {showModal && selectedCell !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>빙고칸 내용</h3> 
              <button className="close-button" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-content">
              <div className="image-placeholder">(인증사진)</div>
              <p className="comment-placeholder">(인증멘트)</p>
              <div className="like-section">
                <button 
                  onClick={handleLikeClick} 
                  className="like-button" 
                  disabled={hasLiked} // 한 번 누르면 비활성화
                >
                  ❤
                </button>
                <span>{likeCount}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BingoMain;