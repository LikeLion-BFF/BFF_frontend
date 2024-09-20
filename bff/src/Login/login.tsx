/* eslint-disable @typescript-eslint/no-unused-vars */
// import React from 'react';
import '../style/login.scss';
import shortLogo from '../assets/images/short_logo.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';
import { API_URL } from '../API_URL';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: `http://${API_URL}/kakao-callback`  // 카카오 개발자 콘솔에 등록한 Redirect URI
    });
  };

  // 카카오 로그인 콜백 처리 함수
  // const handleKakaoCallback = async () => {
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const code = queryParams.get('code');  // Authorization Code

  //   if (code) {
  //     try {

  //       // 1. 로그인 → 토큰 요청
  //       const response = await axios.get(`${API_URL}/kakao/login/?code=${code}`);
  //       const { access_token, refresh_token, user_created } = response.data;

  //       // 2. access_token 저장
  //       localStorage.setItem('access_token', access_token);
  //       localStorage.setItem('refresh_token', refresh_token);

  //       console.log('카카오 로그인 성공:', response.data);

  //       // 3. 사용자 정보 요청
  //       await fetchUserInfo(access_token);

  //       // 4. 토큰 유효성 검증 요청
  //       await verifyToken(access_token);

  //       // 5. 페이지 리디렉트
  //       navigate('/dashboard');
  //     } catch (error) {
  //       console.error('카카오 로그인 오류:', error);
  //     }
  //   }
  // };

  // 네이버 로그인 버튼 초기화
  useEffect(() => {
    if (window.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "rxdXJKf6trtwICVPPRCc",
        callbackUrl: "http://localhost:5173/naver-callback",  // 네이버 개발자 센터에 등록한 Redirect URI
        isPopup: false, // 팝업 형태로 로그인을 수행할지 설정 (true: 팝업, false: 리디렉트)
        loginButton: {color: "green", type: 3, height: 42}
      });

      naverLogin.init();

      // 로그인 상태 확인 및 콜백 처리
      naverLogin.getLoginStatus((status: boolean) => {
        if (status) {
          const userId = naverLogin.user.getId();
          console.log("로그인 성공, 사용자 ID:", userId);
        } else {
          console.log("네이버 로그인 실패");
        }
      });
    } else {
      console.error("Naver SDK가 로드되지 않았습니다.");
    }
  }, []);

  // 네이버 로그인 처리 함수
  const handleNaverLogin = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');  // Authorization Code
    const state = queryParams.get('state');  // state 값

    if (code && state) {
      try {
        // 1. 로그인 → 토큰 요청
        const response = await axios.get(`${API_URL}/naver/login/?code=${code}&state=${state}`);
        const { access_token, refresh_token, user_created } = response.data;

        console.log(`userCreated: ${user_created}`)

        // 2. access_token 저장
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        console.log('네이버 로그인 성공:', response.data);

        // 3. 사용자 정보 요청
        await fetchUserInfo(access_token);

        // 4. 토큰 유효성 검증 요청
        await verifyToken(access_token);

        // 5. 페이지 리디렉트
        navigate('/dashboard');
      } catch (error) {
        console.error('네이버 로그인 오류:', error);
      }
    }
  };

  // 사용자 정보 요청
  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/users/detail/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      console.log('사용자 정보:', response.data);
    } catch (error) {
      console.error('사용자 정보 요청 오류:', error);
    }
  };

  // 토큰 유효성 검증 함수
  const verifyToken = async (accessToken: string) => {
    try {
      const response = await axios.get(`${API_URL}/users/verify/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });
      console.log('토큰 검증 성공:', response.data);
    } catch (error) {
      console.error('토큰 검증 오류:', error);
    }
  };

  return (
    <div className="container">
      <div className="logo-container">
        <img src={shortLogo} alt="Bingle Logo" className="logo" />
      </div>
      <div className="login-container">
        <h1 className="login">간편로그인</h1>
        <p className="desc">소셜 로그인 인증을 통해 간편하게 서비스를 이용할 수 있어요</p>
        <div className="login-buttons">
          {/* 카카오 로그인 버튼에 클릭 이벤트 연결 */}
          <h1 id="kakao" onClick={handleKakaoLogin}>카카오로 시작하기</h1>

          {/* 네이버 로그인 버튼 추가 */}
          <div id="naverIdLogin" className="button" onClick={handleNaverLogin}></div>

          <div id="google-log">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                if (credentialResponse.credential) {
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log(`decoded for google: ${decoded}`);
                  localStorage.setItem('userToken', credentialResponse.credential); // local storage에 저장
                  try {
                    const response = await axios.get(`${API_URL}/google/login/`);
                    console.log(`response.data for google: ${response.data}`);
                    navigate("/start");
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } catch (error: any) {
                    console.error('Error during Axios GET request - Google login: ', error.response);
                  }
                } else {
                  console.log('Credential is undefined - Google login');
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

