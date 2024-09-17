import React, { useState, useEffect } from 'react';
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

function BingoBuilder() {
  const [bingoName, setBingoName] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [datePicked, setDatePicked] = useState<Date | null>(null);
  const [teamInput, setTeamInput] = useState<number>(0);
  const [goalInput, setGoalInput] = useState<number>(0);
  const [bingoBoard, setBingoBoard] = useState<string[][]>([]);

  const navigate = useNavigate();

  // 빙고 이름 설정 함수
  const handleBingoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBingoName(event.target.value);
    console.log(`bingoName: ${bingoName}`);
  };

  // 사이즈 설정 버튼 함수
  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    console.log(`bingo size: ${size}`);
  };

  // 날짜 설정 함수
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDatePicked(newValue.toDate()); // Convert Dayjs object to Date
      console.log(`finish date: ${newValue.toDate()}`);
    } else {
      setDatePicked(null);
      console.log('finish date: null');
    }
  };

  // 팀 갯수 설정 함수
  const handleTeamInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const teamNumber = Number(event.target.value);
    setTeamInput(teamNumber);
    console.log(`team number: ${teamNumber}`);
  };

  // 목표 설정 함수
  const handleGoalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const goalNumber = Number(event.target.value);
    setGoalInput(goalNumber);
    console.log(`bingo goal: ${goalNumber}`);
  };

  // 빙고판 만들기
  useEffect(() => {
    if (selectedSize) {
      const initialBoard = Array.from({ length: selectedSize }, () =>
        Array.from({ length: selectedSize }, () => '')
      );
      setBingoBoard(initialBoard);
    }
  }, [selectedSize]);

  // 빙고 cell 내용 설정 함수
  const handleBingoInputChange = (row: number, col: number, value: string) => {
    const updateBoard = bingoBoard.map((r, rowIndex) =>
      rowIndex === row ? r.map((c, colIndex) => (colIndex === col ? value : c)) : r
    );
    setBingoBoard(updateBoard);
  };

  // 빙고 만들기
  const renderBingoBoard = () => {
    return bingoBoard.map((row, rowIndex) => (
      <div key={rowIndex} className="bingoBoard">
        {row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            value={cell}
            onChange={(event) => handleBingoInputChange(rowIndex, colIndex, event.target.value)}
            className="bingoCell"
          />
        ))}
      </div>
    ));
  }

  // 빙고 데이터 전송
  const sendDataToServer = async () => {
    if (!bingoName || selectedSize === null || !datePicked || teamInput <= 0 || goalInput <= 0) {
      window.alert('모든 입력칸을 채워주세요.');
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

    console.log(data);

    try {
      const response = await fetch(`${API_URL}/bingo/create/`, {
        method: 'POST',
        headers: {
          'Key' : 'Authorization',
          'Value' : `${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Data successfully sent to the server');
      const responseData = await response.json();
      console.log('초대코드:', responseData);
      
      // 초대코드 저장
      localStorage.setItem('inviteCode', responseData);
      
      window.confirm(`빙고 초대코드는 ${responseData} 입니다.`)
      navigate("/invite");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
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
            <button name="refresh" className="refreshButton">
              <img src={reload} alt="reload" className="reloadImage" />
            </button>
          </div>
          <div className="recommendItems">
            {/* 추천 내용 리스트 아이템 */}
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
        <p className="desc">* 빙고판 안을 클릭하여 내용을 채워보세요</p>
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
                // renderInput={(params) => <TextField {...params} />}
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
  );
}

export default BingoBuilder;
