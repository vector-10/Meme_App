const Header = () => {
  return (
    <div>
      <nav className="navbar text-light" style={{ backgroundColor: "#2c1762" }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="../images/meme-logo.jpeg"
              alt="meme-Logo"
              className="d-inline-block align-text-top"
            />
            Meme-app
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Header;
