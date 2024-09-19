import userImage from '../assets/images/user.png';
// import homeImage from '../assets/images/home.png';
import logo from '../assets/images/logo.png';
import '../style/Home/leftmenu.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { API_URL } from '../API_URL';
import axios from 'axios';

function LeftMenu() {
  const navigate = useNavigate();
  const { bingoId, teamId } = useParams();
  const [ bingoInfo, setBingoInfo ] = useState<{bingo_title: string, team_name: string, member_count: number, members: string[]}>({ bingo_title: '', team_name: '', member_count: 0, members: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/team/detail/?bingo_id=${bingoId}&team_id=${teamId}`, {
          headers: {
            Key: 'Authorization',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        };

        setBingoInfo(response.data);

        console.log(`왼쪽 메뉴 정보 수신: ${response.data}`);
      } catch (error) {
        console.error('Error fetching getting bingo info in Left menu:', error);
      }
    }
    fetchData();
  }, [])

  return (
    <div className="leftMenu-container">
      <button className="homeButton" onClick={() => {
        console.log("navigate to '/' - home")
        navigate("/")
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FE7210" className="size-6 home-homeStyle">
          <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
          <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
        </svg>
        <img src={logo} alt="short Bingle logo image" className="logoStyle" />
      </button>
      {/* <button className="home-homeButton" onClick={() => {
          if (window.confirm("빙고판 참여를 취소하시겠습니까?")) navigate("/"); }} >
        <img src={shortLogo} alt="short style Bingle logo" className="home-shortLogo" />
      </button> */}
      <div className="home-teamContainer">
        <div id="home-bingoName">{bingoInfo.bingo_title}</div>
        <div className="horizontalLine"></div>
        <div className="teamNameNum">
          <h1 id="teamName">{bingoInfo.team_name}</h1>
          <h1 id="home-teamNum">
            <img src={userImage} alt="User" className="userStyle" />
            {bingoInfo.member_count}
          </h1>
        </div>
        <div id="teamMates">
          {bingoInfo.members.map((member, index) => {
            return <h3 key={index}>{member}</h3>;
          })}
        </div>
      </div>
    </div>
  );
}

export default LeftMenu;
