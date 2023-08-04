import { useState, useEffect } from "react";
// import axios from "axios";

const Meme = () => {
  const memeApiUrl = "https:api.imgflip.com/get_memes";
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomnImage: "https://i.imgflip.com/1g8my4.jpg",
  });

  //   const [allMemes, setAllMemes] = useState([]);
  //   useEffect(() => {
  //     axios.get(memeApiUrl).then((response) => {
  //       setAllMemes([...response]);
  //     });
  //   }, []);

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch(memeApiUrl)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.randomn() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target.value;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };
  return (
    <div>
      <div className="meme-component">
        <div className="form mb-3">
          <label htmlFor="forminput" className="form-label">
            Toptext
          </label>
          <input
            type="text"
            className="form-input"
            id="forminput"
            placeholder="Enter text"
            value={meme.topText}
            onChange={handleChange}
          />
          <label htmlFor="forminput" className="form-label">
            Bottomtext
          </label>
          <input
            type="text"
            className="form-input"
            id="forminput"
            placeholder="Enter text"
            value={meme.bottomText}
            onChange={handleChange}
          />
        </div>
      </div>
      <button onClick={getMemeImage} className="new-meme">
        Get a new meme image
      </button>
      <div className="meme">
        <img src={meme.randomImage} className="meme-image" alt="the meme" />
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom">{meme.bottomText}</h2>
      </div>
    </div>
  );
};

export default Meme;
