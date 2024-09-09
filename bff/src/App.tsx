// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import React, { useEffect } from 'react';
import Login from '../src/Login/login';
import Home from '../src/Home/Home';
import StartingPage from './StartingPage/StartingPage';
import Invite from './Invite';

function App() {

  useEffect(() => {
    const checkKakao = setInterval(() => {
      if (window.Kakao) {
        if (!Kakao.isInitialized()) {
          Kakao.init('22de60ab09c3306811daa41beddf0989');
          console.log('Kakao SDK 초기화 성공:', Kakao.isInitialized());
        } else {
          console.log('Kakao SDK가 이미 초기화되었습니다.');
        }
        clearInterval(checkKakao);  // SDK가 로드되면 반복을 멈춥니다.
      } else {
        console.error('Kakao SDK가 로드되지 않았습니다.');
      }
    }, 500); // 0.5초 간격으로 체크

  }, []);

  return (
    <>
      {/* <Login /> */}
      {/* <Home /> */}
      {/* <StartingPage /> */}
      <Invite/>
    </>
  );
}

export default App;
