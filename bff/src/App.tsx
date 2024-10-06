import {useEffect, useState} from 'react';
import Login from './Login/login';
import Home from './Home/Home';
import StartingPage from './StartingPage/StartingPage';
import BingoBuilder from './BingoBuilder/BingoBuilder';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Invite from './Invite/Invite';
import KakaoCallback from './Login/KakaoCallback';  
import NaverCallback from './Login/NaverCallback';  
import BingoMain from './Home/BingoMain';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 카카오 SDK 체크 및 초기화
    const checkKakao = setInterval(() => {
      if (window.Kakao) {
        if (!Kakao.isInitialized()) {
          Kakao.init('848269971fc479ce5b2f8ce83e88f787');
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
    // const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2ODk5MzA4LCJpYXQiOjE3MjY4OTYzMDgsImp0aSI6IjdjYjAzYjJhN2VjZTRlMmJhNzhlNDk5NDJmN2JkN2I4IiwidXNlcl9pZCI6Mn0.9h9bUGykJnkMVZw_5sHSeJaPc_pJ5Z5PuvN0RvH6DBE';
    // localStorage.setItem('userToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI2ODk5MzA4LCJpYXQiOjE3MjY4OTYzMDgsImp0aSI6IjdjYjAzYjJhN2VjZTRlMmJhNzhlNDk5NDJmN2JkN2I4IiwidXNlcl9pZCI6Mn0.9h9bUGykJnkMVZw_5sHSeJaPc_pJ5Z5PuvN0RvH6DBE');

    console.log(localStorage.getItem('userToken'))

    if (userToken) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    // Function to listen to storage changes
    const handleStorageChange = () => {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    // Check on component mount
    handleStorageChange();

    // Add event listener for storage changes (for tokens)
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    // <Routes>
    //   {!isLoggedIn ? (
    //     // 로그인 상태가 아니면 로그인 화면을 렌더링
    //     <>
    //       <Route path="/" element={<Login />} />
    //     </>
    //   ) : (
    //     <>
    //       {/* 기존 경로들은 주석 처리 */}
    //       <Route path="/" element={<StartingPage />} />
    //       <Route path="/invite/:inviteCode" element={<Invite />} />
    //       <Route path="/home/:bingoId/:teamId" element={<Home />} />
    //       <Route path="/bingobuilder" element={<BingoBuilder />} />
    //     </>
    //   )}
      
    //   {/* 소셜 로그인 콜백 경로 추가 */}
    //   <Route path="/kakao-callback" element={<KakaoCallback />} />
    //   <Route path="/naver-callback" element={<NaverCallback />} />
    // </Routes>
    // <BingoBuilder />
    <StartingPage />
  );
}

export default App;
