// import { useState } from 'react'
import '../style/login.scss';

function Login() {

  return (
    <div className="container">
      <div className="login-container">
        <h1 className="login">간편로그인</h1>
        <p className="desc">소셜 로그인 인증을 통해 간편하게 서비스를 이용할 수 있어요</p>
        {/* 밑을 삭제하고 작성한 코드 붙여넣기 */}
        <div>
          <h1 className="button">카카오</h1>
          <h1 className="button">네이버</h1>
          <h1 className="button">구글</h1>
        </div>
      </div>
    </div>
  )
}

export default Login
