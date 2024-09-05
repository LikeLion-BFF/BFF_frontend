// import '../style/Home/home.scss';
// import LeftMenu from './LeftMenu';
// import RightMenu from './RightMenu';
// import BingoMain from './BingoMain';

// function Home() {
//   const containerStyle = {
//     height: '100%',
//     width: '100%',
//   }

//   return (
//     <div style={containerStyle}>
//       <LeftMenu />
//       <BingoMain />
//       <RightMenu />
//     </div>
//   );
// }

// export default Home;

import React from 'react';
import '../style/Home/home.scss';
import LeftMenu from './LeftMenu';
import RightMenu from './RightMenu';
import BingoMain from './BingoMain';

function Home() {
  return (
    <div className="home-container">
      <LeftMenu />
      <BingoMain />
      <RightMenu />
    </div>
  );
}

export default Home;