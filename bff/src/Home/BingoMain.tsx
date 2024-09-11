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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // 업로드된 이미지 상태
  const [comment, setComment] = useState(''); // 한줄 멘트 상태

  // 빙고 칸 클릭 핸들러
  const handleCellClick = (index: number) => {
    setSelectedCell(index); // 클릭한 칸의 인덱스 저장
    setShowModal(true);     // 모달 창 표시
    setHasLiked(false);     // 새로운 칸을 클릭하면 좋아요 초기화
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setShowModal(false); // 모달 창 닫기
    setUploadedImage(null); // 모달 닫을 때 이미지 초기화
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = () => {
    if (!hasLiked) { // 한 번만 누를 수 있도록 제한
      setLikeCount(likeCount + 1); // 좋아요 카운트 증가
      setHasLiked(true); // 더 이상 누를 수 없도록 설정
    }
  };

  // 파일 업로드 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string); // 이미지 미리보기 상태 저장
      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 변환하여 읽기
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

  // 한줄 멘트 입력 핸들러
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length <= 17) {
      setComment(input); // 17자 이하로 입력 가능
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
              style={{ fontWeight: bingoStatus[index] ? 'bold' : 'normal' }} // 인증된 칸은 글씨 bold 처리
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
        <h3>{bingoStatus[selectedCell] ? '빙고칸 내용' : '인증샷 업로드'}</h3> {/* 인증 여부에 따라 다른 제목 */}
        <button className="close-button" onClick={handleCloseModal}>✕</button>
      </div>
      <div className="modal-content">
        {bingoStatus[selectedCell] ? (
          // 인증된 칸의 모달 내용
          <>
            <div className="image-placeholder">{uploadedImage ? <img src={uploadedImage} alt="uploaded" /> : '(인증사진)'}</div>
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
          </>
        ) : (
          // 인증되지 않은 칸의 모달 내용
          <>
            <div className="image-placeholder">
              {uploadedImage ? (
                <img src={uploadedImage} alt="uploaded" />
              ) : (
                <>
                <img src="../src/assets/images/image-place.png" alt="placeholder" style={{width: '100px', height: '100px', marginBottom: '10px'}} />
                  <p>사진을 첨부하세요</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ marginTop: '10px'}} 
                  />
                </>
              )}
            </div>
            <input 
              type="text" 
              value={comment} 
              onChange={handleCommentChange} 
              placeholder="한줄멘트를 입력하세요 (0/17자)"
              style={{width: '100%', height: '25px', fontSize: '15px', marginBottom: '20px'}}
            />
            <button className="submit-button" 
                    disabled={!uploadedImage}
                    style={{fontSize: '14px', width: '70px', height: '30px', borderRadius: '5px' }}>
                    완료
                    </button> {/* 이미지 업로드 전에는 비활성화 */}
          </>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default BingoMain;