// import React from 'react';
import '../style/login.scss';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {

  // 카카오 로그인 처리 함수
  const handleKakaoLogin = () => {
    Kakao.Auth.authorize({
      redirectUri: 'http://localhost:5173/kakao-callback'  // 카카오 개발자 콘솔에 등록한 Redirect URI
    });
  };

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="login">간편로그인</h1>
        <p className="desc">소셜 로그인 인증을 통해 간편하게 서비스를 이용할 수 있어요</p>
        <div>
          {/* 카카오 로그인 버튼에 클릭 이벤트 연결 */}
          <h1 className="button" onClick={handleKakaoLogin}>카카오</h1>
          <h1 className="button">네이버</h1>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (credentialResponse.credential) {
                const decoded = jwtDecode(credentialResponse.credential);
                console.log(decoded);
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

