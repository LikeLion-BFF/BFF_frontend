import React from 'react';
import userImage from '../assets/images/user.png';
import homeImage from '../assets/images/home.png';
import '../style/Home/leftmenu.scss';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../API_URL';

function LeftMenu() {
  const navigate = useNavigate();

  // 빙고이름, 팀명, 팀원 수, 팀원 이름 불러오는 함수 작성 필요

  return (
    <div className="leftMenu-container">
      <button className="homeButton" onClick={() => navigate("/")}>
        <img src={homeImage} alt="home button" className="homeStyle" />
        Bingle
      </button>
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
