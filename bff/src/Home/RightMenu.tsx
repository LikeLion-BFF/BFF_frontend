import rewardImage from '../assets/images/reward.png';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RightMenu() {
  const myTeamPercentage = 33; // fetch 받아야함
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    // axios를 사용하여 서버에서 팀 데이터를 가져옵니다.
    fetchTeams().then(data => {
      setTeams(data);
    });
  }, []);

  // axios를 사용하여 서버에서 팀 데이터를 가져오는 함수입니다.
  async function fetchTeams() {
    try {
      const response = await axios.get('여기에_서버_URL_입력');
      // 서버 응답에서 데이터 부분만 반환합니다.
      return response.data;
    } catch (error) {
      console.error('팀 데이터를 가져오는데 실패했습니다:', error);
      return []; // 에러가 발생했을 경우 빈 배열 반환
    }
  }

  const container={
    width: '15vw',
    height: '100vh',
  }
  const rankBanner={
    display: 'flex',
    alignItems: 'center',
    height: '7%'
  }
  const rankText={
    borderColor: 'transparent',
    fontSize: 22,
    fontWeight: '300',
  }
  const rewardStyle = {
    width: '1.5vw',
    height: '1.5vw',
    padding: '1vw',
  }
  const rankContainer={
    backgroundColor: 'lightgray',
    height: '89vh'
  }
  const myTeam={
    padding: '8%',
  }
  const myTeamRank={
    fontWeight: '700',
    fontSize: 22,
    paddingTop: '5%',
    paddingBottom: '10%',
  }
  const myTeamMedal={
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4%',
  }
  const medal={
    backgroundColor: 'gray',
    width: 30,
    height: 30,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '5%',
  }
  const medalNum={
    color: 'white',
    fontSize: 22,
  }
  const teamName={
    fontSize: 22,
    fontWeight: '700',
  }
  const teamStats={
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '5%',
  }
  const teamBingos={}
  const teamPercent={}
  const teamBar: React.CSSProperties = {
    position: 'absolute',
    backgroundColor: 'black',
    width: '13vw',
    height: '2.5vh'
  }
  const teamStatBar={
    position: 'relative',
    left: 0,
    top: 0,
    backgroundColor: 'gray',
    width: `${myTeamPercentage}%`,
    height: '2.5vh'
  }
  const line={
    width: '100%',
    height: '0.1vh',
    backgroundColor: 'gray',
    marginTop: '2vh',
    marginBottom: '1.5vw',
  }
  const allTeamsContainer={
    paddingLeft: '1vw',
  }
  const allTeamText={
    fontSize: 22,
    fontWeight: '700',
  }

  return (
    <div style={container}>
      <div style={rankBanner}>
        <img src={rewardImage} alt="Reward Image" style={rewardStyle} />
        <h1 style={rankText}>RANK</h1>
      </div>
      <div style={rankContainer}>
        {/* 우리팀 fetch */}
        <div style={myTeam}>
          <h1 style={myTeamRank}>우리팀 순위</h1>
          <div style={myTeamMedal}>
            <div style={medal}>
              <h1 style={medalNum}>4</h1>
              {/* 임시숫자 fetch 필요 */}
            </div>
            <h1 style={teamName}>팀명 {/* 팀명 fetch */}</h1>
          </div>
          <div style={teamStats}>
            <h4 style={teamBingos}>0빙고 0칸{/* 통계 fetch */}</h4>
            <h4 style={teamPercent}>33%{/* % fetch */}</h4>
          </div>
          <div style={teamBar}>
            <div style={teamStatBar}></div>
          </div>
        </div>
        <div style={line}></div>
        {/* 모든팀 fetch */}
        <div style={allTeamsContainer}>
          <h1 style={allTeamText}>전체 순위</h1>
          {teams.map(team => (
            <div style={myTeam}>
            <div style={myTeamMedal}>
              <div style={medal}>
                <h1 style={medalNum}>4</h1>
                {/* 임시숫자 fetch 필요 */}
              </div>
              <h1 style={teamName}>팀명 {/* 팀명 fetch */}</h1>
            </div>
            <div style={teamStats}>
              <h4 style={teamBingos}>0빙고 0칸{/* 통계 fetch */}</h4>
              <h4 style={teamPercent}>33%{/* % fetch */}</h4>
            </div>
            <div style={teamBar}>
              <div style={teamStatBar}></div>
            </div>
          </div>
          ))}
          {/* 등수에 따라 디자인 바뀌는 것 수정 필요 -> 서버 연결 후 */}
        </div>
      </div>
      <div style={timeContainer}>
        <h4 style={time}>~종료시간~</h4>
        {/* 종료시간 fetch */}
      </div>
    </div>
  );

}

export default RightMenu;

