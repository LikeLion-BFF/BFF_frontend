// import React from 'react';
import userImage from '../assets/images/user.png';
import homeImage from '../assets/images/home.png';
import logo from '../assets/images/logo.png';
import '../style/Home/leftmenu.scss';
import { useNavigate } from 'react-router-dom';
// import { API_URL } from '../API_URL';

function LeftMenu() {
  const navigate = useNavigate();

  // 빙고이름, 팀명, 팀원 수, 팀원 이름 불러오는 함수 작성 필요

  return (
    <div className="leftMenu-container">
      <button className="homeButton" onClick={() => navigate("/")}>
        {/* <img src={homeImage} alt="home logo" className="home-homeStyle" /> */}
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
        <div id="home-bingoName">빙고이름</div>
        <div className="horizontalLine"></div>
        <div className="teamNameNum">
          <h1 id="teamName">팀명
            {/* 팀명 fetch */}
          </h1>
          <h1 id="home-teamNum">
            <img src={userImage} alt="User" className="userStyle" />
            4
            {/* 숫자 fetch */}
          </h1>
        </div>
        <div id="teamMates">
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

export default LeftMenu;
