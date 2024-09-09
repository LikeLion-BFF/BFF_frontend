import React, { useState, useEffect } from 'react';
import '../style/startingpage.scss';
import axios from 'axios';

function StartingPage() {
  const [bingoBoards, setBingoBoards] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('YOUR_SERVER_ENDPOINT'); // 서버에서 fetch
  //       setBingoBoards(response.data); // data 세팅
  //     } catch (error) {
  //       console.error('Error fetching BINGO data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // localStorage에서 유저 토큰 가져오기
        const userToken = localStorage.getItem('userToken');
        
        // axios 요청에 Authorization 헤더 추가
        const response = await axios.get('YOUR_SERVER_ENDPOINT', {
          headers: {
            Authorization: `Bearer ${userToken}` // Bearer 스키마 사용, 필요에 따라 수정
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
    <div className="container">
      <div className="mainContainer">
        <div className="banner">
          <h1 className="logo">Bingle</h1>
          <button className="newButton">빙고 생성</button>
          {/* 이동 navigation 추가 필요 */}
        </div>
        <div className="bingoContainer">
          <div className="bingo">
            <p className="bingoName">임시 빙고 이름</p>
            <div className="bingoItem"></div>
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