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