import '../style/invite.scss'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import shortLogo from '../assets/images/short_logo.png'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../API_URL';

// interface TeamCountResponse {
//   count: number;
// }

const bingoId = sessionStorage.getItem('bingo_id') || '';
const inviteCode = sessionStorage.getItem('inviteCode') || '';

function Invite() {
  const [teamCount, setTeamCount] = useState<number>(0); // 팀 개수
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [name, setName] = useState<string>(''); // 이름 저장

  const navigate = useNavigate();

  //! Axios 안 쓴 버전
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = {
  //         bingo_id: bingoId,
  //         code: inviteCode
  //       }

  //       const response = await fetch(`${API_URL}/bingo/join/`, {
  //         method: 'POST',
  //         headers: {
  //           'Key' : 'Authorization',
  //           'Value' : `Bearer ${localStorage.getItem('userToken')}`,
  //         },
  //         body: JSON.stringify(data),
  //       })
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const responseData = await response.json();
  //       console.log('response data: ', responseData);
  //       setTeamCount(responseData.teams.length);
  //     } catch (error) {
  //       console.error('Error fetching team count:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = {
          bingo_id: bingoId,
          code: inviteCode
        };
  
        const response = await axios.post(`${API_URL}/bingo/join/`, data, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
  
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        console.log('response data: ', response.data);
        setTeamCount(response.data.teams.length);
      } catch (error) {
        console.error('Error fetching team count:', error);
      }
    };
    fetchData();
  }, []);

  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    console.log(`teamValue: ${event.target.value}`);
    setSelectedTeam(value === "" ? null : Number(value));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 자동 전송 방지
    try {
      const data = {
        bingo_id: bingoId,
        name: name,
        team_name: `${selectedTeam}팀`
      };
  
      const response = await axios.post(`${API_URL}/bingo/join/team/`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
  
      // 세션에 저장된 초대코드, 빙고 아이디 삭제
      sessionStorage.removeItem('inviteCode');
      sessionStorage.removeItem('bingo_id');
  
      // responseData 출력
      console.log('초대코드:', response.data);
  
    } catch (error) {
      console.error('Error submitting data - Invite:', error);
      // 전송 실패 에러 보여주기
    }
  };

  return (
    <form className="invite-container" onSubmit={handleSubmit}>
      <button className="invite-homeButton" onClick={() => {
          if (window.confirm("빙고판 참여를 취소하시겠습니까?")) navigate("/"); }} >
        <img src={shortLogo} alt="short style Bingle logo" className="invite-shortLogo" />
      </button>
      <div className="invite-mainContainer">
        <p className="desc_title">빙고 참여</p>
        <p className="desc">이름과 소속팀을 설정해주세요</p>
        <label htmlFor="nameLabel" className="nameLabel">이름</label>
        <input type="string" name="nameLabel" id="name" value={name} onChange={handleNameChange} className="nameArea" placeholder='홍길동'></input>
        <label htmlFor="team" className="team">팀</label>
        <select className="teamSelect" name="team" id="team" value={selectedTeam === null ? "" : selectedTeam.toString()} onChange={handleTeamChange}>
          <option value="">팀 선택...</option>
          {[...Array(teamCount)].map((_, index) => (
            <option key={index} value={index + 1}>{`팀 ${index + 1}`}</option>
          ))}
        </select>
        <button type="submit" className="submitButton">입장</button>
      </div>
    </form>
  );
}

export default Invite;