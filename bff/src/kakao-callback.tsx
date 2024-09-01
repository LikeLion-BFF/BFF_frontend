import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const KakaoCallback = () => {
  const location = useLocation();

  useEffect(() => {
    // URL에서 카카오 인증 코드를 추출하여 처리
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    if (code) {
      // 카카오에서 제공한 인증 코드를 통해 사용자 정보를 요청하는 로직을 추가합니다.
      // 예를 들어, 백엔드 서버에 이 코드를 보내고, 서버에서 액세스 토큰을 받아오는 과정을 구현합니다.
      console.log('Kakao 인증 코드:', code);
      
      // 이후 서버에 인증 코드를 보내거나 클라이언트에서 직접 토큰을 교환할 수 있습니다.
    } else {
      console.error('Kakao 인증 코드가 없습니다.');
    }
  }, [location]);

  return (
    <div>
      <h1>카카오 로그인 중...</h1>
    </div>
  );
};

export default KakaoCallback;
