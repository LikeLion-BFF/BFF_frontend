import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/startingpage.scss';
import axios from 'axios';
import longLogo from '../assets/images/long_logo.png'
import { API_URL } from '../API_URL';

function StartingPage() {
  const navigate = useNavigate();
  const [bingoBoards, setBingoBoards] = useState([]);

  const handleInviteCode = () => {
    
  };

  // 빙고판 선택시 이동 위해
  const handleBingoClick = (bingoId) => {
    navigate(`/home/${bingoId}`);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 유저 토큰 가져오기
        const userToken = localStorage.getItem('userToken');
        
        // axios 요청에 Authorization 헤더 추가
        const response = await axios.get(`${API_URL}//bingo/list/`, {
          headers: {
            "Key" : "Authorization",
            "Value": `Bearer ${userToken}`
          }
        });
        
        setBingoBoards(response.data); // data 세팅
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
          {/* 이동 navigation 추가 필요 */}
        </div>
        <div className="start-bingoContainer">
          <div className="start-bingo">
            <p className="start-bingoName">임시 빙고 이름</p>
            <div className="start-bingoItem"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// BINGO 보여주는 코드
// {bingoBoards.length > 0 ? (
//   bingoBoards.map((board, index) => (
//     <div key={index}>
//       {/* <p>{board.name}</p> */}
//       {/* <div> {board.bingo} bingo를 이미지로 저장해서 보여주려나? </div> */}
//     </div>
//   ))
// ) : (
//   <div className="no-bingo-banner">아직 참여하고 있는 빙고판이 없습니다!</div>
// )}

export default StartingPage;