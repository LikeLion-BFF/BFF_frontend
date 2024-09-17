import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../API_URL';

function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleNaverCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');
      const state = queryParams.get('state');
      
      if (code && state) {
        try {
          const response = await axios.get(`${API_URL}/naver/login/?code=${code}&state=${state}`);
          const { access_token, refresh_token } = response.data;
          
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);

          console.log('네이버 로그인 성공:', response.data);
          
          navigate('/home');
        } catch (error) {
          console.error('네이버 로그인 처리 오류:', error);
        }
      }
    };

    handleNaverCallback();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default NaverCallback;

