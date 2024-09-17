import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/startingpage.scss';
import axios from 'axios';
import longLogo from '../assets/images/long_logo.png'
import { API_URL } from '../API_URL';

function StartingPage() {
  const navigate = useNavigate();
  const [bingoBoards, setBingoBoards] = useState([]); // 빙고판 목록 상태 추가

  const handleInviteCode = () => {
    // 참여 코드 입력 시 동작 추가 필요
  };

  // 빙고판 선택시 이동을 위한 함수
  const handleBingoClick = (bingoId) => {
    navigate(`/home/${bingoId}`);
  };
  
  // API 호출을 통한 빙고판 목록 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 유저 토큰 가져오기
        const userToken = localStorage.getItem('userToken');
        
        // axios 요청에 Authorization 헤더 추가
        const response = await axios.get(`${API_URL}/bingo/list/`, {
          headers: {
            "Authorization": `Bearer ${userToken}` // API 호출 시 헤더 수정
          }
        });
        
        setBingoBoards(response.data); // 빙고판 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching BINGO data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="start-container">
      <div className="start-mainContainer">
        <div className="banner">
          <img src={longLogo} alt="long style Bingle logo" className="start-logo" />
          <div className="start-buttons">
            <input type="text" className="inviteCode" placeholder='참여코드를 입력해주세요'/>
            <button name="inviteCode" onClick={() => handleInviteCode} className="inviteSubmit">참여하기</button>
            <button className="newButton" onClick={() => navigate('/bingobuilder')}>빙고 생성</button>
          </div>
        </div>

        <div className="start-bingoContainer">
          {/* 빙고판 목록 출력 부분 */}
          {bingoBoards.length > 0 ? (
            bingoBoards.map((board, index) => (
              <div key={index} className="start-bingo" onClick={() => handleBingoClick(board.id)}>
                <p className="start-bingoName">{board.bingo_title}</p>
                <div className="start-bingoItem">
                  {/* 각 빙고 셀에 대한 정보 */}
                  {board.bingo_cells.map((cell, cellIndex) => (
                    <div key={cellIndex} className={`bingo-cell ${cell.is_completed ? 'completed' : ''}`}>
                      {cell.content} {/* 셀의 내용 출력 */}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-bingo-banner">
                참여 중인 빙고가 없습니다.<br />
                참여 코드를 입력하거나, 빙고 생성을 하여 시작하세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartingPage;