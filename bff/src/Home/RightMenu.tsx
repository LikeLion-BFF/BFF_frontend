import userImage from '../assets/images/user.png';

function RightMenu() {
  const container={
    width: '15%',
    height: '100vh',
  }
  const homeButton={
    borderColor: 'transparent',
    width: '100%',
    height: '7%',
    fontSize: 35,
  }
  const teamContainer: React.CSSProperties = {
    backgroundColor: 'lightgray',
    height: '93%',
    textAlign: 'center',
  }
  const teamNameNum={
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10%',
    height: '10%',
    fontSize: 22,
    paddingTop: '15%',
  }
  const teamName={
    fontWeight: '700',
  }
  const teamNum={}
  const userStyle={
    width: 20,
    heigth: 20,
    paddingRight: 10,
  }
  const teamMates={

  }

  return (
    <div style={container}>
      <button style={homeButton}>Bingle</button>
      <div style={teamContainer}>
        <div style={teamNameNum}>
          <h1 style={teamName}>팀명
            {/* 팀명 fetch */}
          </h1>
          <h1 style={teamNum}>
            <img src={userImage} alt="User Image" style={userStyle} />
            4
            {/* 숫자 fetch */}
          </h1>
        </div>
        <div style={teamMates}>
          {/* 팀원 fetch */}
          {/* iterate 하면서 h3 태그로 가져오기 -> 공통 스타일 적용 */}
          <h3>김나나</h3>
          <h3>김다다</h3>
          <h3>김라라</h3>
          <h3>김뫄뫄</h3>
        </div>
      </div>
    </div>
  );

}

export default RightMenu;

