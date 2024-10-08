/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import '../style/Home/bingomain.scss';
import downloadIcon from '../assets/images/download.png';
import html2canvas from 'html2canvas';
import axios from 'axios'; 
import { API_URL } from '../API_URL';  
import { useParams } from 'react-router-dom';  

const dummyData = [
  {
      "row": 1,
      "col": 1,
      "content": "일초라도안보이면",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 1,
      "col": 2,
      "content": "이렇게초조한데",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 1,
      "col": 3,
      "content": "삼초는어떻게기다려이야이야ㅣ야이야",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 2,
      "col": 1,
      "content": "사랑해 널 사랑해",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 2,
      "col": 2,
      "content": "오늘은 말할거야",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 2,
      "col": 3,
      "content": "육십억(팔십억)지구에서 널 만난건",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 3,
      "col": 1,
      "content": "행운이야~",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 3,
      "col": 2,
      "content": "팔딱팔딱뛰는 가슴",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  },
  {
      "row": 3,
      "col": 3,
      "content": "구해줘 오 내마음~",
      "is_completed": false,
      "completed_photo": null,
      "completed_text": ""
  }
]
// 더미 팀 정보
const dummyTeamInfo = {
  bingo_title: "더미 빙고 타이틀",
  team_name: "더미 팀 이름",
  member_count: 4,
  members: ["회원1", "회원2", "회원3", "회원4"],
};

interface BingoInfo {
  row: number;
  col: number;
  content: string;
  is_completed: boolean;
  completed_photo: null | undefined;
  completed_text: string;
};

const BingoMain: React.FC = () => {
  const [bingoStatus, setBingoStatus] = useState<(string | null)[]>(Array(9).fill(null)); 
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [isCompleteButtonEnabled, setIsCompleteButtonEnabled] = useState(false);

  const [ teamInfo, setTeamInfo ] = useState<{bingo_title: string, team_name: string, member_count: number, members: string[]}>({ bingo_title: '', team_name: '', member_count: 0, members: [] });

  const [ bingoInfo, setBingoInfo ] = useState<BingoInfo>(dummyData);

  // URL 파라미터에서 bingoId와 teamId를 가져옴
  const { bingoId, teamId } = useParams<{ bingoId: string; teamId: string }>();  

  const modalRef = useRef<HTMLDivElement>(null);

  //확인후 지우기
  // 서버에서 데이터를 불러오는 대신, 더미 데이터를 사용하는 방식
  const fetchTeamInfo = async () => {
    console.log('서버 대신 더미 팀 정보 사용');
    setTeamInfo(dummyTeamInfo);  // 더미 팀 정보 적용
  };

  const fetchBingo = async () => {
    console.log('서버 대신 더미 빙고 정보 사용');
    setBingoInfo(dummyData);  // 더미 빙고 정보 적용
  };

  useEffect(() => {
    fetchTeamInfo();  // 더미 데이터를 사용하여 초기화
    fetchBingo();
  }, []);

  // const fetchTeamInfo = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/bingo/team/detail/?bingo_id=${bingoId}&team_id=${teamId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error('Network response was not ok');
  //     };

  //     setTeamInfo(response.data);

  //     console.log(`팀 정보 수신: ${response.data}`);
  //   } catch (error) {
  //     console.error('Error fetching getting team info:', error);
  //   }
  // }

  // const fetchBingo = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/bingo/bingoboard/detail/?bingo_id=${bingoId}&team_id=${teamId}`, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     if (response.status !== 200) {
  //       throw new Error('Network response was not ok');
  //     };

  //     setBingoInfo(response.data.bingo_cells);

  //     console.log(`빙고 정보 수신: ${response.data.bingo_cells}`);
  //   } catch (error) {
  //     console.error('Error fetching getting bingo info:', error);
  //   }
  // }

  // useEffect(() => {
  //   fetchTeamInfo()
  //   fetchBingo()
  // }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleModalCloseAttempt();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  const handleModalCloseAttempt = () => {
    const isConfirmed = window.confirm('작성한 내용은 저장되지 않습니다.');
    if (isConfirmed) {
      handleCloseModal();
    }
  };


  // const handleLikeClick = () => {
  //   if (!hasLiked) {
  //     setLikeCount(likeCount + 1);
  //     setHasLiked(true);
  //   }
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log('이미지 로드 완료:', reader.result);  // 상태 변경 확인
        setUploadedImage(reader.result as string);
      };
      reader.onerror = () => {
        console.error('이미지 업로드 실패');
        alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
        setUploadedImage(null);  // 업로드 실패 시 이미지 초기화
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

  const handleCompleteClick = async () => {
    if (selectedCell !== null && uploadedImage && bingoId && teamId) {
      // 선택한 셀의 상태를 업데이트 (업로드된 이미지를 해당 셀에만 저장)
      const updatedBingoStatus = [...bingoStatus];
      updatedBingoStatus[selectedCell] = uploadedImage;  // 해당 셀에 이미지 저장
      setBingoStatus(updatedBingoStatus);
  
      // 백엔드로 이미지 및 인증 정보 전달
      try {
        const userToken = localStorage.getItem('userToken');  // 토큰 가져오기
        const response = await axios.post(
          `${API_URL}/bingo/complete/cell/`,
          {
            bingo_id: parseInt(bingoId),  // URL에서 받아온 bingo_id
            team_id: parseInt(teamId),    // URL에서 받아온 team_id
            row: Math.floor(selectedCell / 3) + 1,  // 선택된 셀의 행 계산
            col: (selectedCell % 3) + 1,            // 선택된 셀의 열 계산
            completed_photo: uploadedImage,         // 업로드한 이미지 URL
            completed_text: comment                 // 입력한 코멘트
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,  // 사용자 토큰 전달
            }
          }
        );
        console.log('인증 성공:', response.data);
  
        // 업로드 완료 후 빙고판 정보를 다시 불러옴
        await fetchBingo();  // 빙고판 정보 다시 불러오기
  
        // 모달 닫기
        handleCloseModal();
      } catch (error) {
        console.error('인증 실패:', error);
      }
    }
  };
  
  // 칸을 클릭할 때 해당 칸의 이미지 상태를 유지하면서 모달 열기
  const handleCellClick = (index: number) => {
    setSelectedCell(index);  // 선택한 셀 저장
    setUploadedImage(bingoStatus[index]);  // 해당 셀에 저장된 이미지를 불러옴
    setShowModal(true);  // 모달 표시
    setHasLiked(false);  // 좋아요 상태 초기화
  };
  
  // 모달을 닫을 때 상태 초기화
  const handleCloseModal = () => {
    setShowModal(false);
    setUploadedImage(null); // 모달을 닫을 때 이미지 초기화 (다른 칸에 영향을 주지 않음)
    setComment(''); // 코멘트 초기화
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

  const findContentForCell = (index) => {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    const cellInfo = bingoInfo.cells.find(cell => cell.row === row && cell.col === col);
    return cellInfo ? cellInfo.content : '';
  };

  return (
    <div className="bingo-container">
      <div className="bingo-header">
        <h2>{teamInfo.bingo_title}</h2>
        <p>{teamInfo.team_name}의 빙고</p>
      </div>
      <div className="bingo-background">
        <div className="bingo-grid">
          {bingoInfo.map((cell, index) => (
            <button 
              key={index} 
              className={`bingo-cell ${cell.is_completed ? 'completed' : ''}`}  // 완료된 칸에 'completed' 클래스 적용
              onClick={() => handleCellClick(index)}
              style={{
                backgroundImage: cell.completed_photo ? `url(${cell.completed_photo})` : 'none', // 이미지가 있으면 배경에 적용
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              {/* 이미지 위에 텍스트 표시, 인증된 경우 흰색, 미인증된 경우 검정색 */}
              <span className={`bingo-text ${cell.is_completed ? 'completed' : 'pending'}`}>
                {cell.content}
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
        <div className="modal-overlay" ref={modalRef}>
          <div className="modal">
            <div className="modal-header">
              <h3 style={{ textAlign: 'center', fontSize: '20px', marginTop: '10px', fontWeight:'bold', marginBottom: '10px'}}>인증샷 업로드</h3>
              <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '5px' }}>
                빙고칸 내용: {`칸 내용 ${selectedCell + 1}`}
              </p>
              <button className="close-button" onClick={handleModalCloseAttempt}>✕</button>
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
                        onClick={handleCompleteClick}  // 완료 버튼 클릭 시 이미지 적용 및 백엔드 연동
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