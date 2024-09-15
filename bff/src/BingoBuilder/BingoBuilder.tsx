import React, { useEffect, useState } from 'react';
import '../style/bingobuilder.scss';
import reload from '../assets/images/reload.png';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useNavigate } from 'react-router-dom';
import homeImage from '../assets/images/home.png';
// import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';

function BingoBuilder() {
  const [bingoName, setBingoName] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [datePicked, setDatePicked] = useState<Date | null>(null);
  const [teamInput, setTeamInput] = useState<number>(0);
  const [goalInput, setGoalInput] = useState<number>(0);

  const navigate = useNavigate();

  // Handle textarea change
  const handleBingoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBingoName(event.target.value);
    console.log(`bingoName: ${bingoName}`);
  };

  // Handle size button selection
  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    console.log(`bingo size: ${size}`);
  };

  // Handle date change
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDatePicked(newValue.toDate()); // Convert Dayjs object to Date
      console.log(`finish date: ${newValue.toDate()}`);
    } else {
      setDatePicked(null);
      console.log('finish date: null');
    }
  };

  // Handle team input change
  const handleTeamInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const teamNumber = Number(event.target.value);
    setTeamInput(teamNumber);
    console.log(`team number: ${teamNumber}`);
  };

  // Handle goal input change
  const handleGoalInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const goalNumber = Number(event.target.value);
    setGoalInput(goalNumber);
    console.log(`bingo goal: ${goalNumber}`);
  };

  // Function to send data to the server
  const sendDataToServer = async () => {
    const data = {
      size: selectedSize,
      date: datePicked,
      team: teamInput,
      goal: goalInput,
      title: bingoName,
    };

    console.log(data);

    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Data successfully sent to the server');
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
          <img src={homeImage} alt="home button" className="builder-homeStyle" />
          Bingle
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
        <div className="bingoFrame"></div>
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
