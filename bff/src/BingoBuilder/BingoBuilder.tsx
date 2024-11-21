import React, { useState, useEffect, useRef } from 'react';
import InvitePopup from '../Invite/InvitePopup'; 
import '../style/bingobuilder.scss';
import reload from '../assets/images/reload.png';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import shortLogo from '../assets/images/short_logo.png';
import { Dayjs } from 'dayjs';
import { API_URL } from '../API_URL';
import axios from 'axios';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const dummyData = {
  "missions": [
      "팀원들과 함께 랜덤으로 선정된 주제로 1분 스피치 하기:  자신을 소개하고 숨겨진 재능을 발견하는 시간! ",
      "팀원 모두의 휴대폰 배경화면 공유하기:  서로의 취향을 알아보고 공감대를 형성하는 시간! ",
      "팀원들과 함께 추억의 게임 하기:  추억을 공유하며 즐거운 시간을 보내고 팀워크를 향상시키는 시간!",
      "팀원들과 함께 즉석 연극 만들어 공연하기:  상상력과 창의력을 발휘하여 팀워크를 발휘하는 시간! ",
      "팀원들과 함께 10년 후 나의 모습 상상하며 그림 그리기:  미래에 대한 꿈을 공유하고 서로에게 힘이 되어주는 시간! "
  ]
};

// 아이템 타입 정의
const ItemTypes = {
  RECOMMEND_ITEM: 'recommendItem',
};

// RecommendItem 컴포넌트 (드래그 가능)
interface RecommendItemProps {
  item: string;
}

const RecommendItem: React.FC<RecommendItemProps> = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.RECOMMEND_ITEM,
    item: { content: item },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <p
      ref={drag}
      className="recommendItem"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {item}
    </p>
  );
};

// BingoCell 컴포넌트 (드롭 가능 + 직접 텍스트 입력 가능)
interface BingoCellProps {
  value: string;
  row: number;
  col: number;
  onDrop: (row: number, col: number, content: string) => void;
  onInputChange: (row: number, col: number, value: string) => void;
  selectedSize: number;
}

const BingoCell: React.FC<BingoCellProps> = ({ value, row, col, onDrop, onInputChange, selectedSize }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.RECOMMEND_ITEM,
    drop: (item: { content: string }) => onDrop(row, col, item.content),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const cellStyle = {
    fontSize: selectedSize === 3 ? '2vh' : selectedSize === 4 ? '1.5vh' : '1.5vh',
    paddingTop: selectedSize === 3 ? '7vh' : selectedSize === 4 ? '5vh' : '3vh'
  };

  return (
    <textarea
      ref={drop}
      value={value}
      onChange={(e) => onInputChange(row, col, e.target.value)}
      className={`bingoCell ${isOver ? 'hovered' : ''}`}
      style={cellStyle}
    />
  );
};

function BingoBuilder() {
  const [bingoName, setBingoName] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number>(3);
  const [datePicked, setDatePicked] = useState<Date | null>(null);
  const [teamInput, setTeamInput] = useState<number>(0);
  const [goalInput, setGoalInput] = useState<number>(0);
  const [bingoBoard, setBingoBoard] = useState<string[][]>([]);
  const [inviteCode, setInviteCode] = useState<string>(''); 
  const [showPopup, setShowPopup] = useState<boolean>(false); 
  const [recommendItems, setRecommendItems] = useState<string[]>([]);

  const bingoBoardRef = useRef<string[][]>([]); 

  const navigate = useNavigate();

  // 팝업 닫기 함수
  const handlePopupClose = () => {
    setShowPopup(false);
    navigate(`/invite/${inviteCode}`); // 팝업 닫고 초대화면으로 이동
  };

  // 빙고 이름 설정 함수
  const handleBingoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBingoName(event.target.value);
  };

  // 사이즈 설정 버튼 함수
  const handleSizeSelect = (size: number) => {
    const isConfirmed = window.confirm("빙고 사이즈를 변경하면 이미 작성한 내용이 사라질 수 있습니다. 계속하시겠습니까?");

    if (isConfirmed) {
      setSelectedSize(size);
    }
  };

  // 날짜 설정 함수
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDatePicked(newValue.toDate());
    } else {
      setDatePicked(null);
    }
  };

  // 팀 갯수 설정 함수
  const handleTeamInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const teamNumber = Number(event.target.value);
    setTeamInput(teamNumber);
  };

  // 목표 설정 함수
  const handleGoalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const goalNumber = Number(event.target.value);
    setGoalInput(goalNumber);
  };

  // 추천 내용
  const fetchRecommendItems = async () => {
    try {
      // const token = localStorage.getItem('userToken');
      // if (!token) {
      //   throw new Error('No user token found.');
      // }

      // const response = await axios.post(
      //   `${API_URL}/contentAPI/recommend/`,
      //   {},
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );

      // if (response.status !== 200) {
      //   throw new Error('Failed to fetch recommended items');
      // }

      console.log('is this working?')
      // const data = response.data;
      // const recommendItem = data.missions.map((mission: string) => mission.split(':')[0]);
      // setRecommendItems(recommendItem);

      // console.log(`recommendItem: `, recommendItem);

      const modDummyData = dummyData.missions.map(( mission: string) => mission.split(':')[0])
      setRecommendItems(modDummyData); //! dummyData로 설정

      console.log("Mod Dummy Data:", modDummyData);
    } catch (error) {
      console.error('Error fetching recommend item: ', error);
    }
  };

  // 화면 로드하고 1번 호출
  useEffect(() => {
    fetchRecommendItems();
  }, []);

  // 빙고판 만들기
  useEffect(() => {
    if (selectedSize) {
      const initialBoard = Array.from({ length: selectedSize }, () =>
        Array.from({ length: selectedSize }, () => '')
      );
      setBingoBoard(initialBoard);
      bingoBoardRef.current = initialBoard;
    }
  }, [selectedSize]);

  // 빙고 cell 내용 설정 함수
  const handleBingoInputChange = (row: number, col: number, value: string) => {
    const updateBoard = bingoBoardRef.current.map((r, rowIndex) =>
      rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
    );
    bingoBoardRef.current = updateBoard; // Update ref
    setBingoBoard(updateBoard); // Trigger re-render
  };

  // 드래그 아이템으로 빙고 cell 설정 함수 (기존 내용 보존)
  const handleBingoDrop = (row: number, col: number, content: string) => {
    const updatedBoard = bingoBoardRef.current.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((c, colIndex) => (colIndex === col ? (c || "") + " " + content : c))
        : r
    );
    bingoBoardRef.current = updatedBoard; // Update ref
    setBingoBoard(updatedBoard); // Trigger re-render
  };

  // 빙고판 렌더 함수
  const renderBingoBoard = () => {
    return bingoBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="bingoBoard">
        {row.map((cell, colIndex) => (
          <BingoCell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            row={rowIndex}
            col={colIndex}
            onDrop={handleBingoDrop}
            onInputChange={handleBingoInputChange}
            selectedSize={selectedSize}
          />
        ))}
      </div>
    ));
  };

  // 빙고 데이터 전송
  const sendDataToServer = async () => {
    if (!bingoName || selectedSize === null || !datePicked || teamInput <= 0 || goalInput <= 0) {
      window.alert('모든 입력칸을 채워주세요!');
      return;
    }

    const flattenedContent = bingoBoard.flat().map(String);
    const formattedDatePicked = datePicked ? datePicked.toISOString() : null;

    const data = {
      title: bingoName,
      size: selectedSize,
      teams: teamInput,
      goal: goalInput,
      end_date: formattedDatePicked,
      content: flattenedContent,
    };

    try {
      const response = await fetch(`${API_URL}/bingo/create/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setInviteCode(responseData.code);
      setShowPopup(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container">
        {showPopup && <InvitePopup inviteCode={inviteCode} onClose={handlePopupClose} />}

        <div className="recommend">
          <button className="builder-homeButton" onClick={() => {
            if (window.confirm("만들어진 빙고판은 저장되지 않습니다. 계속하시겠습니까?")) {
              navigate("/");
            }
          }}>
            <img src={shortLogo} alt="home button" className="builder-logo" />
          </button>
          <div className="horizontalLine"></div>
          <p className="bingoName">{bingoName}</p>
          <div className="horizontalLine"></div>
          <div className="recommendList">
            <div className="refreshBanner">
              <label htmlFor="refresh" className="refreshLabel">빙고 내용 추천</label>
              <button name="refresh" className="refreshButton" onClick={fetchRecommendItems}>
                <img src={reload} alt="reload" className="reloadImage" />
              </button>
            </div>
            <div className="recommendItems">
              {recommendItems.map((item, index) => (
                <RecommendItem key={index} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="bingo">
          <input
            type="text"
            required
            name="bingoName"
            id="bingoName"
            className="bingoNameText"
            placeholder="제목을 입력해주세요."
            value={bingoName}
            onChange={handleBingoNameChange}
          />
          <div className="bingoFrame">
            {renderBingoBoard()}
          </div>
          <p className="builder-desc">* 빙고판 안을 클릭하여 내용을 채워보세요</p>
        </div>

        <div className="settings">
          <div className="settingItems">
            <h1 className="settingTitle">빙고판 편집</h1>
            <p className="title">크기</p>
            <div className="sizeSelector">
              {[3, 4, 5].map((size) => (
                <button
                  key={size}
                  className={`sizeButton ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size} x {size}
                </button>
              ))}
            </div>
            <p className="title">빙고판 종료</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                  label="종료 시간을 선택하세요"
                  className="timeSelector"
                  onChange={(newValue) => handleDateChange(newValue)}
                />
              </DemoContainer>
            </LocalizationProvider>
            <p className="title">참여팀 수</p>
            <div id="teamContainer">
              <input
                type="number"
                name="teamNum"
                required
                id="teamNum"
                className="teamNum"
                onChange={handleTeamInputChange}
              />
              <label htmlFor="teamNum" className="teamNumText">팀</label>
            </div>
            <p className="title">목표</p>
            <div className="goalContainer">
              <input
                type="number"
                min="1"
                max="5"
                required
                name="goal"
                id="goal"
                className="goal"
                onChange={handleGoalInputChange}
              />
              <label htmlFor="goal" className="goalText">빙고</label>
            </div>
          </div>
          <button className="submit" onClick={sendDataToServer}>
            빙고판 생성
          </button>
        </div>
      </div>
    </DndProvider>
  );
}

export default BingoBuilder;
