import React, { useEffect, useState } from 'react';
import '../style/bingobuilder.scss';
import reload from '../assets/images/reload.png';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';

function BingoBuilder() {
  const [bingoName, setBingoName] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [datePicked, setDatePicked] = useState<Date | null>(null);
  const [teamInput, setTeamInput] = useState<number>(0);
  const [goalInput, setGoalInput] = useState<number>(0);

  // 1. textarea의 변경을 처리하는 함수
  const handleBingoNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setBingoName(event.target.value);
    console.log(`bingoName: ${bingoName}`);
  };

  // size 버튼 선택 관리 함수
  const handleSizeSelect = (size: number) => {
    setSelectedSize(size);
    console.log(`bingo size: ${selectedSize}`);
  };

  // 날짜 선택 값
  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    if (newValue !== null) {
      setDatePicked(newValue.toDate()); // Dayjs object -> Date object
      console.log(`finish date: ${datePicked}`);
    } else {
      setDatePicked(null);
      console.log(`finish date === null`)
    }
  };

  // 팀 숫자 값
  const handleTeamInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const teamNumber = +event.target.value;
    setTeamInput(teamNumber);
    console.log(`team number: ${teamInput}`);
  };

  // 목표 빙고 값
  const handleGoalInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const goalNumber = +event.target.value;
    setGoalInput(goalNumber);
    console.log(`bingo goal: ${goalInput}`);
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

      // Handle success
      console.log('Data successfully sent to the server');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="recommend">
        <p className="bingoName">{bingoName}</p>
        <div className="horizontalLine"></div>
        <div className="recommendList">
          <div className="refreshBanner">
            <label htmlFor="refresh" className='refreshLabel'>빙고 내용 추천</label>
            <button name="refresh" className='refreshButton'>
              <img src={reload} alt="reload image" className="reloadImage" />
            </button>
          </div>
          <div className='recommendItems'>
            {/* 추천 내용 리스트 아이템 */}
          </div>
        </div>
      </div>
      <div className="bingo">
        <textarea
          name="bingoName"
          id="bingoName"
          className="bingoNameText"
          placeholder='제목을 입력해주세요.'
          value={bingoName} // 2. bingoName 상태 바인딩
          onChange={handleBingoNameChange} // 3. onChange 이벤트 핸들러 바인딩
        />
        <div className="bingoFrame">

        </div>
        <p className="desc">* 빙고판 안을 클릭하여 내용을 채워보세요</p>
      </div>
      <div className="settings">
        <div className="settingItems">
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
                className='timeSelector'
                onChange={handleDateChange}
                renderInput={(params: { value: string | null }) => <TextField {...params} />}
              />
            </DemoContainer>
          </LocalizationProvider>
          <p className="title">참여팀 수</p>
          <div className="teamContainer">
            <textarea name="teamNum" id="teamNum" className="teamNum" onChange={handleTeamInputChange} />
            <label htmlFor="teamNum" className="teamNumText">팀</label>
          </div>
          <p className="title">목표</p>
          <div className="goalContainer">
            <textarea name="goal" id="goal" className="goal" onChange={handleGoalInputChange}/>
            <label htmlFor="goal" className="goalText">빙고</label>
          </div>
        </div>
        <button className="submit" onClick={sendDataToServer}>빙고판 생성</button>
      </div>
    </div>
  );
}

export default BingoBuilder;