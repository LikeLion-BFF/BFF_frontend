import React, { useEffect, useState } from 'react';
import Login from './Login/login';
import Home from './Home/Home';
import StartingPage from './StartingPage/StartingPage';
import BingoBuilder from './BingoBuilder/BingoBuilder';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Invite from './Invite/Invite';
import KakaoCallback from './Login/KakaoCallback';  // 카카오 콜백 컴포넌트 추가
import NaverCallback from './Login/NaverCallback';  // 네이버 콜백 컴포넌트 추가
import BingoMain from './Home/BingoMain';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 SDK 체크 및 초기화
    const checkKakao = setInterval(() => {
      if (window.Kakao) {
        if (!Kakao.isInitialized()) {
          Kakao.init('22de60ab09c3306811daa41beddf0989');
          console.log('Kakao SDK 초기화 성공:', Kakao.isInitialized());
        } else {
          console.log('Kakao SDK가 이미 초기화되었습니다.');
        }
        clearInterval(checkKakao);  // SDK가 로드되면 반복을 멈춤
      } else {
        console.error('Kakao SDK가 로드되지 않았습니다.');
      }
    }, 500);

    // 로그인 상태 확인
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      {!isLoggedIn ? (
        // 로그인 상태가 아니면 로그인 화면을 렌더링
        <Route path="/" element={<Login />} />
      ) : (
        <>
          {/* 로그인된 상태에서 렌더링할 경로들 */}
          <Route path="/" element={<StartingPage />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bingobuilder" element={<BingoBuilder />} />
          <Route path="/home/BingoMain" element={<BingoMain />} />
        </>
      )}
      
      {/* 소셜 로그인 콜백 경로 추가 */}
      <Route path="/kakao-callback" element={<KakaoCallback />} />
      <Route path="/naver-callback" element={<NaverCallback />} />
    </Routes>

    // <>
    //    {/* <Login /> */}
    //    <Home />
    //    {/* <StartingPage /> */}
    //    {/* <Invite/> */}
    //    <BingoBuilder />
    // </>

  );
}

export default App;
