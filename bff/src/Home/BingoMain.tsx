import React, { useState, useEffect } from 'react';
import '../style/Home/bingomain.scss';
import downloadIcon from '../assets/images/download.png';
import html2canvas from 'html2canvas';

const BingoMain: React.FC = () => {
  const [bingoStatus, setBingoStatus] = useState<(string | null)[]>(Array(9).fill(null)); // 각 칸의 상태를 이미지 URL 또는 null로 저장
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isCompleteButtonEnabled, setIsCompleteButtonEnabled] = useState(false);

  const handleCellClick = (index: number) => {
    setSelectedCell(index);
    setShowModal(true);
    setHasLiked(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUploadedImage(null);
  };

  const handleLikeClick = () => {
    if (!hasLiked) {
      setLikeCount(likeCount + 1);
      setHasLiked(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('이미지 로드 완료:', reader.result);  // 상태 변경 확인
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 업로드 상태가 변경될 때 버튼 활성화 여부를 결정
  useEffect(() => {
    if (uploadedImage) {
      setIsCompleteButtonEnabled(true);
      console.log("이미지 업로드됨, 완료 버튼 활성화");
    } else {
      setIsCompleteButtonEnabled(false);
    }
  }, [uploadedImage]);

  const handleCompleteClick = () => {
    if (selectedCell !== null && uploadedImage) {
      const updatedBingoStatus = [...bingoStatus];
      updatedBingoStatus[selectedCell] = uploadedImage; // 선택한 칸에 업로드한 이미지를 저장
      setBingoStatus(updatedBingoStatus);
      handleCloseModal();
    }
  };

  const handleDownloadClick = () => {
    const bingoElement = document.querySelector('.bingo-background') as HTMLElement;
    if (bingoElement) {
      html2canvas(bingoElement).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'bingo-board.png';
        link.click();
      });
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length <= 17) {
      setComment(input);
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
              className={`bingo-cell ${bingoStatus[index] ? 'completed' : ''}`}  // 완료된 칸에 'completed' 클래스 적용
              onClick={() => handleCellClick(index)}
              style={{
                backgroundImage: bingoStatus[index] ? `url(${bingoStatus[index]})` : 'none', // 이미지가 있으면 배경에 적용
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              {/* 이미지 위에 텍스트 표시, 인증된 경우 흰색, 미인증된 경우 검정색 */}
              <span className={`bingo-text ${bingoStatus[index] ? 'completed' : 'pending'}`}>
                {`칸 내용 ${index + 1}`}
              </span>
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

      {showModal && selectedCell !== null && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', fontWeight:'bold', marginBottom: '10px'}}>인증샷 업로드</h3>
              <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '5px' }}>
                빙고칸 내용: {`칸 내용 ${selectedCell + 1}`}
              </p>
              <button className="close-button" onClick={handleCloseModal}>✕</button>
            </div>
            <div className="modal-content">
              <div className="image-placeholder">
                {uploadedImage ? (
                  <img src={uploadedImage} alt="uploaded" className="uploaded-image"/>
                ) : (
                  <>
                    <img src="../src/assets/images/image-place.png" alt="placeholder" className="icon"/>
                    <p>사진을 첨부하세요</p>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      style={{ marginTop: '10px' }}
                    />
                  </>
                )}
              </div>
              <input 
                type="text" 
                value={comment} 
                onChange={handleCommentChange} 
                placeholder="한줄멘트를 입력하세요 (0/17자)"
                style={{ width: '100%', height: '25px', fontSize: '15px', marginBottom: '20px' }}
              />
              <button className="submit-button" 
                      disabled={!isCompleteButtonEnabled}
                      style={{ 
                        fontSize: '14px', 
                        width: '70px', 
                        height: '30px', 
                        borderRadius: '5px', 
                        cursor: isCompleteButtonEnabled ? 'pointer' : 'not-allowed'
                      }}
                      onClick={handleCompleteClick}  // 완료 버튼 클릭 시 이미지 적용
              >
                완료
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BingoMain;