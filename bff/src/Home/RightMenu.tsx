import rewardImage from '../assets/images/reward.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/Home/rightmenu.scss';
import { useParams } from 'react-router-dom';
import { API_URL } from '../API_URL';

interface TeamRank {
  team__team_name: string;
  completed_bingo_count: number;
  completed_cell_count: number;
}

interface MyTeamInfo {
  team_name: string;
  completed_bingo_count: number;
  completed_cell_count: number;
  goal: number;
}

function RightMenu() {
  const [myTeamInfo, setMyTeamInfo] = useState<MyTeamInfo>({team_name: '', completed_bingo_count: 0, completed_cell_count: 0, goal: 0});
  const [teamRanks, setTeamRanks] = useState<TeamRank[]>([]);
  const [endDate, setEndDate] = useState<string>("");

  const { bingoId, teamId } = useParams();

  useEffect(() => {
    fetchMyTeam();
    fetchTeams();
    fetchTime();
  }, []);

  async function fetchMyTeam() {
    try {
      const response = await axios.get(`${API_URL}/rank/getOurRank/?bingo_id=${bingoId}&team_id=${teamId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      };

      console.log(`우리팀 정보 수신: ${response.data}`);
      setMyTeamInfo(response.data);
    } catch (error) {
      console.error('Error fetching my team rank', error);
    }
  }

  async function fetchTeams() {
    try {
      const response = await axios.get(`${API_URL}/rank/getTotalRank/?bingo_id=${bingoId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      };

      console.log(`전체 순위 정보 수신: ${response.data.progress}`);
      setTeamRanks(response.data.progress);
    } catch (error) {
      console.error('Error fetching team ranks', error);
    }
  };

  async function fetchTime() {
    try {
      const response = await axios.get(`${API_URL}/bingo/end_date/?bingo_id=${bingoId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      };

      const endDate = new Date(response.data.end_date);
      const formattedDate = `${endDate.getFullYear()}.${(endDate.getMonth() + 1).toString().padStart(2, '0')}.${endDate.getDate().toString().padStart(2, '0')} ${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

      console.log(`종료 시간 수신: ${formattedDate}`);
      setEndDate(formattedDate);
    } catch (error) {
      console.error('Error fetching end date', error);
    }
  };

  return (
    <div className="rightmenu-container">
      <div className="rankBanner">
        <img src={rewardImage} alt="Reward Image" className="rewardStyle" />
        <h1 className="rankText">RANK</h1>
      </div>
      <div className="rankContainer">
        <div className="myTeam">
          <h1 className="myTeamRank">우리팀 순위</h1>
          <div className="myTeamMedal">
            <div className="myMedal" style={{ }}>
              <h1 className="myMedalNum">4</h1>
            </div>
            <h1 className="myTeamName">{myTeamInfo.team_name}</h1>
          </div>
          <div className="teamStats">
            <h4 className="teamBingos">{myTeamInfo.completed_bingo_count}빙고 {myTeamInfo.completed_cell_count}칸</h4>
            <h4 className="teamPercent">{(myTeamInfo.completed_bingo_count)/(myTeamInfo.goal) * 100}%
            </h4>
          </div>
          <div className="myTeamBar">
            <div className="myTeamStatBar" style={{ width: `${(myTeamInfo.completed_bingo_count)/(myTeamInfo.goal) * 100}%` }}>
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="allTeamsContainer">
          <h1 className="allTeamText">전체 순위</h1>
          {teamRanks.map((team, index) => (
            <div className="teams" key={index}> 
              <div className="teamsMedal">
                <div className="teamMedal">
                  <div className="medal" style={{ backgroundColor: index === 0 ? '#FABB14' : index === 1 ? '#8FB5B7' : index === 2 ? '#A67361' : 'gray' }}>
                    <h1 className="medalNum">{index + 1}</h1>
                  </div>
                  <h1 className="teamName">{team.team__team_name}</h1>
                </div>
                <div className="teamsStats">
                  <h4 className="teamBingos">{team.completed_bingo_count}빙고</h4>
                  <h4 className="teamPercent">{(team.completed_bingo_count)/(myTeamInfo.goal) * 100}%</h4>
                </div>
              </div>
              <div className="teamBar">
                <div className="teamStatBar" style={{ width: `${(team.completed_bingo_count)/(myTeamInfo.goal) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="timeContainer">
        <h4 className="time">{endDate} 종료</h4>
      </div>
    </div>
  );
}

export default RightMenu;