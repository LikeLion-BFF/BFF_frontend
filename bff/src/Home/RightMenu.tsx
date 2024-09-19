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
}

function RightMenu() {
  const [myTeamInfo, setMyTeamInfo] = useState<MyTeamInfo>({team_name: '', completed_bingo_count: 0, completed_cell_count: 0});
  const [teamRanks, setTeamRanks] = useState<TeamRank[]>([]);

  const { bingoId, teamId } = useParams();

  useEffect(() => {
    fetchMyTeam();
    fetchTeams();
  }, []);

  async function fetchMyTeam() {
    try {
      const response = await axios.get(`${API_URL}/rank/getOurRank/?bingo_id=${bingoId}&team_id=${teamId}`, {
        headers: {
          Key: 'Authorization',
          Value: `Bearer ${localStorage.getItem('userToken')}`,
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
          Key: 'Authorization',
          Value: `Bearer ${localStorage.getItem('userToken')}`,
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      };

      console.log(`전체 순위 정보 수신: ${response.data}`);
      setTeamRanks(response.data);
    } catch (error) {
      console.error('Error fetching team ranks', error);
    }
  };

  return (
    <div className="container">
      <div className="rankBanner">
        <img src={rewardImage} alt="Reward Image" className="rewardStyle" />
        <h1 className="rankText">RANK</h1>
      </div>
      <div className="rankContainer">
        <div className="myTeam">
          <h1 className="myTeamRank">우리팀 순위</h1>
          <div className="myTeamMedal">
            <div className="medal">
              <h1 className="medalNum">4</h1>
            </div>
            <h1 className="teamName">{myTeamInfo.team_name}</h1>
          </div>
          <div className="teamStats">
            <h4 className="teamBingos">{myTeamInfo.completed_bingo_count}빙고 {myTeamInfo.completed_cell_count}칸</h4>
            <h4 className="teamPercent">33%
              {/* 전체 목표가 뭔지 알아야 계산가능 */}
            </h4>
          </div>
          <div className="teamBar">
            <div className="teamStatBar" style={{width: `$33%`}}>
              {/* 계산한 값으로 바 그래프 보여주기 */}
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="allTeamsContainer">
          <h1 className="allTeamText">전체 순위</h1>
          {teamRanks.map((team, index) => (
            <div className="myTeam" key={index}> 
              <div className="myTeamMedal">
                <div className="medal">
                  <h1 className="medalNum">{index + 1}</h1>
                </div>
                <h1 className="teamName">{team.team__team_name}</h1>
              </div>
              <div className="teamStats">
                <h4 className="teamBingos">{team.completed_bingo_count}빙고 {team.completed_cell_count}칸</h4>
                <h4 className="teamPercent">33%</h4>
              </div>
              <div className="teamBar">
                <div className="teamStatBar" style={{width: `33%`}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="timeContainer">
        <h4 className="time">~종료시간~</h4>
      </div>
    </div>
  );
}

export default RightMenu;