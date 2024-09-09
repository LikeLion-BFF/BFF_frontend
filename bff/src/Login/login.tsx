// import React from 'react';
import '../style/login.scss';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react';

function Login() {

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173/kakao-callback'  // 카카오 개발자 콘솔에 등록한 Redirect URI
    });
  };

  // 네이버 로그인 버튼 초기화
  useEffect(() => {
    if (window.naver) {
      const naverLogin = new window.naver.LoginWithNaverId({
        clientId: "rxdXJKf6trtwICVPPRCc", 
        callbackUrl: "http://localhost:5173/naver-callback",  // 네이버 개발자 센터에 등록한 Redirect URI
        isPopup: false, // 팝업 형태로 로그인을 수행할지 설정 (true: 팝업, false: 리디렉트)
        loginButton: {color: "green", type: 3, height: 60} 
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

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="login">간편로그인</h1>
        <p className="desc">소셜 로그인 인증을 통해 간편하게 서비스를 이용할 수 있어요</p>
        <div>
          {/* 카카오 로그인 버튼에 클릭 이벤트 연결 */}
          <h1 className="button" onClick={handleKakaoLogin}>카카오</h1>

          {/* 네이버 로그인 버튼 추가 */}
          <div id="naverIdLogin" className="button"></div>

          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
                localStorage.setItem('userToken', credentialResponse.credential);
              } else {
                console.log('Credential is undefined');
              }
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;

