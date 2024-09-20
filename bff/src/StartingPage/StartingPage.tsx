import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/startingpage.scss';
import axios from 'axios';
import longLogo from '../assets/images/long_logo.png';
import { API_URL } from '../API_URL';

function StartingPage() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [bingoBoards, setBingoBoards] = useState<{ bingo_id: number, team_id: number, bingo_title: string, bingo_cells: { is_completed: boolean, content: string }[] }[]>([]);

  const handleInviteCode = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!inviteCode) window.alert('참여코드를 입력해주세요!');
      else console.log(`입력된 참여코드: ${inviteCode}`);
      
      const response = await axios.post(`${API_URL}/bingo/join/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      // 초대코드, 빙고 id, 팀 갯수 출력
      console.log(
        `inviteCode: ${inviteCode}`,
        `bingo_id: ${response.data.bingo_id}`,
        `number of teams: ${response.data.teams.length}`
      );

      // 초대 페이지로 이동
      navigate(`/invite/${inviteCode}`);
    } catch (error) {
      console.error('Error fetching getting bingo_id and team length in Starting Page:', error);
    }
  };

  const handleBingoClick = (bingoId: number, teamId: number) => {
    navigate(`/home/${bingoId}/${teamId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/bingo/list/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          }
        });

        setBingoBoards(response.data);
      } catch (error) {
        console.error('Error fetching BINGO data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="start-container">
      <div className="start-mainContainer">
        <div className="banner">
          <img src={longLogo} alt="long style Bingle logo" className="start-logo" />
          <div className="start-buttons">
            <form onSubmit={handleInviteCode}>
              <input
                type="text"
                className="inviteCode"
                placeholder='참여코드를 입력해주세요'
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <button type="submit" className="inviteSubmit">참여하기</button>
            </form>
            <button className="newButton" onClick={() => {
              console.log('navigating to bingobuilder');
              navigate('/bingobuilder');
            }}>
              빙고 생성
            </button>
          </div>
        </div>

        <div className="start-bingoContainer">
          {bingoBoards.length > 0 ? (
            bingoBoards.map((board, index) => (
              <div key={index} className="start-bingo" onClick={() => handleBingoClick(board.bingo_id, board.team_id)}>
                <p className="start-bingoName">{board.bingo_title}</p>
                <div className="start-bingoItem">
                  {board.bingo_cells.map((cell, cellIndex) => (
                    <div key={cellIndex} className={`bingo-cell ${cell.is_completed ? 'completed' : ''}`}>
                      {cell.content}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-bingo-banner">
              참여 중인 빙고가 없습니다.<br />
              참여 코드를 입력하거나, 빙고 생성을 하여 시작하세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartingPage;