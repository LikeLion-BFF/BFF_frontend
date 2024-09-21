import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../API_URL';

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKakaoCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');  // Authorization Code
      // http://3.140.221.7:8000/accounts/kakao/login/callback?code=${code}

      if (code) {
        try {
          // const response = await axios.get(`${API_URL}/kakao/login/?code=${code}`);
          const response = await axios.get(`${API_URL}/accounts/kakao/login/callback?code=${code}`);
          const { access_token, refresh_token } = response.data;

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          console.log('카카오 로그인 성공:', response.data);

          navigate('/');
        } catch (error) {
          console.error('카카오 로그인 처리 오류:', error);
        }
      }
    };

    handleKakaoCallback();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default KakaoCallback;