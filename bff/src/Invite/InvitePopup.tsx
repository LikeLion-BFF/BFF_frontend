// InvitePopup.tsx
import React from 'react';
import '../style/invitePopup.scss';
import copyIcon from '../assets/images/copy.png'; // 복사 아이콘 이미지 경로

interface InvitePopupProps {
  inviteCode: string;
  onClose: () => void;
}

function InvitePopup({ inviteCode, onClose }: InvitePopupProps) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>참여코드</h2>
        <p>참여코드를 공유해서,<br></br> 많은 사람들과 모임빙고를 즐겨보세요!</p>
        <div className="invite-code">
          <input type="text" value={inviteCode} readOnly />
          <button onClick={() => navigator.clipboard.writeText(inviteCode)} className="copy-button">
            <img src={copyIcon} alt="Copy Icon" className="copy-icon" />
          </button>
        </div>
        <button onClick={onClose} className="popup-close-button">빙고판 입장</button>
      </div>
    </div>
  );
}

export default InvitePopup;