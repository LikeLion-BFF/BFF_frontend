import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/startingpage.scss';
import longLogo from '../assets/images/long_logo.png';
import { API_URL } from '../API_URL';

interface BingoCell {
  row: number;
  col: number;
  content: string;
  is_completed: boolean;
  completed_photo: string | null;
  completed_text: string;
}

interface BingoBoard {
  bingo_id: number;
  team_id: number;
  bingo_title: string;
  bingo_cells: BingoCell[];
}

const dummyData: BingoBoard[] = [
  {
    bingo_id: 32,
    bingo_title: "테스트빙고",
    team_id: 89,
    bingo_cells: [
      { row: 1, col: 1, content: "열심히수정하는나", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 1, col: 2, content: "하지만너무졸리다", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 1, col: 3, content: "이젠난모르겟어살려줘", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 1, col: 4, content: "1-4", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 1, col: 5, content: "1-5", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 2, col: 1, content: "2-1", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 2, col: 2, content: "2-2", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 2, col: 3, content: "2-3", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 2, col: 4, content: "2-4", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 2, col: 5, content: "2-5", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 3, col: 1, content: "3-1", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 3, col: 2, content: "3-2", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 3, col: 3, content: "3-3", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 3, col: 4, content: "3-4", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 3, col: 5, content: "3-5", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 4, col: 1, content: "3-1", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 4, col: 2, content: "3-2", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 4, col: 3, content: "3-3", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 4, col: 4, content: "3-4", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 4, col: 5, content: "3-5", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 5, col: 1, content: "3-1", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 5, col: 2, content: "3-2", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 5, col: 3, content: "3-3", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 5, col: 4, content: "3-4", is_completed: false, completed_photo: null, completed_text: "" },
      { row: 5, col: 5, content: "3-5", is_completed: false, completed_photo: null, completed_text: "" },
    ]
  },
  {
    "bingo_id": 31,
    "bingo_title": "Bingo",
    "team_id": 85,
    "bingo_cells": [
      { "row": 1, "col": 1, "content": "1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 2, "content": "2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 3, "content": "3", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 4, "content": "3", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 1, "content": "4", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 2, "content": "5", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 3, "content": "6", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 4, "content": "6", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 1, "content": "7", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 2, "content": "8", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 3, "content": "9", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 4, "content": "9", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 4, "col": 1, "content": "7", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 4, "col": 2, "content": "8", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 4, "col": 3, "content": "9", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 4, "col": 4, "content": "9", "is_completed": false, "completed_photo": null, "completed_text": "" }
    ]
  },
  {
    "bingo_id": 32,
    "bingo_title": "테스트빙고",
    "team_id": 89,
    "bingo_cells": [
      { "row": 1, "col": 1, "content": "1-1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 2, "content": "1-2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 3, "content": "1-3", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 1, "content": "2-1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 2, "content": "2-2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 3, "content": "2-3", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 1, "content": "3-1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 2, "content": "3-2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 3, "content": "3-3", "is_completed": false, "completed_photo": null, "completed_text": "" }
    ]
  },
  {
    "bingo_id": 32,
    "bingo_title": "테스트빙고",
    "team_id": 89,
    "bingo_cells": [
      { "row": 1, "col": 1, "content": "열심히수정합시다~~", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 2, "content": "미스페레그린과이상한아이들", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 1, "col": 3, "content": "주먹꾹.....................", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 1, "content": "2-1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 2, "content": "2-2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 2, "col": 3, "content": "2-3", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 1, "content": "3-1", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 2, "content": "3-2", "is_completed": false, "completed_photo": null, "completed_text": "" },
      { "row": 3, "col": 3, "content": "3-3", "is_completed": false, "completed_photo": null, "completed_text": "" }
    ]
  },
];

function StartingPage(): JSX.Element {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState<string>('');
  const [bingoBoards, setBingoBoards] = useState<BingoBoard[]>([]);

  const handleInviteCode = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!inviteCode) {
      window.alert('참여코드를 입력해주세요!');
      return;
    }

    console.log(`입력된 참여코드: ${inviteCode}`);
    try {
      const response = await axios.post(`${API_URL}/bingo/join/`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      console.log(
        `inviteCode: ${inviteCode}`,
        `bingo_id: ${response.data.bingo_id}`,
        `number of teams: ${response.data.teams.length}`
      );
      navigate(`/invite/${inviteCode}`);

    } catch (error) {
      console.error('Error handling invite code in Starting Page:', error);
    }
  };

  const handleBingoClick = (bingoId: number, teamId: number): void => {
    console.log(`선택한 빙고 아이디, 팀 아이디: ${bingoId}, ${teamId}`);
    navigate(`/home/${bingoId}/${teamId}`);
  };

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await axios.get(`${API_URL}/bingo/list/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
            'Content-Type': 'application/json',
          }
        });

        console.log(`response data for bingo board: ${response.data}`);
        setBingoBoards(response.data);
      } catch (error) {
        console.error('Error fetching BINGO data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="start-container">
      <div className="start-mainContainer">
        <div className="banner">
          <img src={longLogo} alt="long style Bingle logo" className="start-logo" />
          <div className="start-buttons">
            <form onSubmit={handleInviteCode}>
              <input
                type="text"
                className="inviteCode"
                placeholder='참여코드를 입력해주세요'
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
              />
              <button type="submit" className="inviteSubmit">참여하기</button>
            </form>
            <button
              className="newButton"
              onClick={() => {
                console.log('navigating to bingobuilder');
                navigate('/bingobuilder');
              }}
            >
              빙고 생성
            </button>
          </div>
        </div>

        <div className="start-bingoContainer">
          {bingoBoards.length > 0 ? (
            bingoBoards.map((board, index) => (
              <div key={index} className="start-bingo" onClick={() => handleBingoClick(board.bingo_id, board.team_id)}>
                <p className="start-bingoName">{board.bingo_title}</p>
                <div className="start-bingoLayout">
                  <div className="start-bingo-grid">
                    {(() => {
                      const gridSize = Math.sqrt(board.bingo_cells.length);
                      return board.bingo_cells.reduce((acc: BingoCell[][], cell, i) => {
                        if (i % gridSize === 0) acc.push([]);
                        acc[acc.length - 1].push(cell);
                        return acc;
                      }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className="bingo-row">
                          {row.map((cell, cellIndex) => {
                            let cellStyle = { width: '10vw', height: '17vh' }; // Default size

                            if (gridSize > 3) {
                              cellStyle = {
                                width: '8vw',
                                height: '13vh',
                              };
                            }
                            if (gridSize > 4) {
                              cellStyle = {
                                width: '7vw',
                                height: '11.5vh',
                              };
                            }

                            return (
                              <div
                                key={cellIndex}
                                className={`start-bingo-cell ${cell.is_completed ? 'completed' : ''}`}
                                style={cellStyle}
                              >
                                <span className="cell-content">{cell.content}</span>
                              </div>
                            );
                          })}
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-bingo-banner">
              참여 중인 빙고가 없습니다.<br />
              참여 코드를 입력하거나, 빙고 생성을 하여 시작하세요!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartingPage;
