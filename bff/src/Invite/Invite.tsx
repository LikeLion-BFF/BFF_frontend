import '../style/invite.scss'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import shortLogo from '../assets/images/short_logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../API_URL';

function Invite() {
  const [teamCount, setTeamCount] = useState<number>(0); // 팀 개수
  const [bingoId, setBingoId] = useState<number | null>(null); // bingo_id 저장
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [name, setName] = useState<string>(''); // 이름 저장

  const navigate = useNavigate();
  const { inviteCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const response = await axios.post(`${API_URL}/bingo/join/`, {
          code: `${inviteCode}`
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          }
        });
  
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        console.log('response data: ', response.data);
        setTeamCount(response.data.teams.length);
        setBingoId(response.data.bingo_id);
      } catch (error) {
        console.error('Error fetching team count:', error);
      }
    };
    fetchData();
  }, []);

  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTeam(value === "" ? null : Number(value));
    console.log(`teamValue selected Team: ${selectedTeam}`);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(`name: ${name}`);
  };

  // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // 자동 전송 방지
  //   try {
  //     const data = {
  //       "bingo_id": bingoId,
  //       "name": name,
  //       "team_name": `${selectedTeam}팀`
  //     };
  
  //     const response = await axios.post(`${API_URL}/bingo/join/team/`, {
  //       "bingo_id": bingoId,
  //       "name": name,
  //       "team_name": `${selectedTeam}팀`
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  
  //     // // 세션에 저장된 초대코드, 빙고 아이디 삭제
  //     // sessionStorage.removeItem('inviteCode');
  //     // sessionStorage.removeItem('bingo_id');
  
  //     // responseData 출력
  //     console.log('빙고 참여 응답: ', response.data);
  //     navigate("/")
  
  //   } catch (error) {
  //     // 전송 실패 에러 보여주기
  //     console.error('Error submitting data - Invite:', error);

  //     if (axios.isAxiosError(error)) {
  //       console.error('Error submitting data - Invite:', error.response?.data || error.message);
  //     } else {
  //       console.error('An unexpected error occurred:', error);
  //       // Handle non-Axios errors here
  //     }
  //   }
  // };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!bingoId || !name || selectedTeam === null) {
      console.error("Missing required fields: bingoId, name, or selectedTeam.");
      return;
    }
  
    try {
      const data = {
        "bingo_id": bingoId,
        "name": name,
        "team_name": `${selectedTeam}팀`,
      };
  
      const response = await axios.post(`${API_URL}/bingo/join/team/`, data, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('빙고 참여 응답: ', response.data);
      navigate("/");
    } catch (error) {
      console.error('Error submitting data - Invite:', error);
  
      if (axios.isAxiosError(error)) {
        console.error('Error response from server:', error.response?.data || error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
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