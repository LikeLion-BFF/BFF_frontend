import '../style/invite.scss'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import shortLogo from '../assets/images/short_logo.png'
import { useNavigate } from 'react-router-dom';

interface TeamCountResponse {
  count: number;
}

function Invite() {
  const [teamCount, setTeamCount] = useState<number>(0); // 팀 개수
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [name, setName] = useState<string>(''); // 이름 저장

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<TeamCountResponse>('YOUR_TEAMS_COUNT_ENDPOINT');
        setTeamCount(response.data.count); // Assuming the response has a count property
      } catch (error) {
        console.error('Error fetching team count:', error);
      }
    };
    fetchData();
  }, []);

  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTeam(value === "" ? null : Number(value));
  };

  const handleNameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // 자동 전송 방지
    try {
      await axios.post('YOUR_SUBMIT_ENDPOINT', { name, teamNumber: selectedTeam });
      // sending 성공
    } catch (error) {
      console.error('Error submitting data:', error);
      // 전송 실패 에러 보여주기
    }
  };

  const exampleNumber = 4;

  //! 서버 api 만들어진 이후에 복붙 | 현재: example Number 사용
  // <select name="team" id="team" value={selectedTeam === null ? "" : selectedTeam.toString()} onChange={handleTeamChange}>
  //   <option value="">팀 선택...</option>
  //   {[...Array(teamCount)].map((_, index) => (
  //     <option key={index} value={index + 1}>{`팀 ${index + 1}`}</option>
  //   ))}
  // </select>

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
        <input type="string" name="nameLabel" id="name" rows={1} value={name} onChange={handleNameChange} className="nameArea" placeholder='홍길동'></input>
        <label htmlFor="team" className="team">팀</label>
        <select name="team" id="team" value={selectedTeam === null ? "" : selectedTeam.toString()} onChange={handleTeamChange} className='teamSelect'>
          <option value="">팀 선택</option>
          {[...Array(exampleNumber)].map((_, index) => (
            <option key={index} value={index + 1}>{`${index + 1}팀`}</option>
          ))}
        </select>
        <button type="submit" className="submitButton">입장</button>
      </div>
    </form>
  );
}

export default Invite;