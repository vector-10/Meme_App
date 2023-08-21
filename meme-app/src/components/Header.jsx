import meme from "../images/meme-logo.png";
const Header = () => {
  return (
    <div className="header">
      <nav
        className="navbar text-light p-4"
        style={{ backgroundColor: "#2c1762" }}
      >
        <div className="container-fluid ">
          <img src={meme} alt="joker face" className=" meme-Logo" />
          <div className="app-name">Meme-app</div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
