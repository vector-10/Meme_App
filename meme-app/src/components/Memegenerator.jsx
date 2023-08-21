import { useState, useEffect } from "react";
import axios from "axios";

const Memegenerator = () => {
  //initialize state for the top and bottom text of the meme
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomnImage: "http://i.imgflip.com/1bij.jpg",
  });

  // initialize state for the entire meme component
  const [allMemes, setAllMemes] = useState([]);
  //set the meme api endpoint as a url
  const memeUrl = "https:api.imgflip.com/get_memes";

  //Make an API call using the axios library
  const fetchMemesFromApi = async () => {
    try {
      const response = await axios.get(memeUrl);
      const memeData = await response.data;
      setAllMemes(memeData.data.memes);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect handles functions with side effects like this API call
  useEffect(() => {
    fetchMemesFromApi();
  }, []);

  // to get meme images from an array of memes t
  const getMemeImage = () => {
    console.log("clicked the meme button");
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomnImage: url,
    }));
  };

  return (
    <div className="meme-component">
      <div className="form">
        <label htmlFor="forminput1" className="form-label">
          TopText
        </label>
        <input
          type="text"
          className="form-control"
          id="formcontrolinput"
          placeholder="toptext"
          value={meme.topText}
          onChange={(e) => setMeme({ ...meme, topText: e.target.value })}
        />

        <div className="mb-3">
          <label htmlFor="forminput1" className="form-labe2">
            BottomText
          </label>
          <input
            type="text"
            className="form-control"
            id="formcontrolinput"
            placeholder="bottomtext"
            value={meme.bottomText}
            onChange={(e) => setMeme({ ...meme, bottomText: e.target.value })}
          />
        </div>
      </div>
      <div className="meme">
        <h2 className="meme-text">{meme.topText}</h2>
        <img src={meme.randomnImage} className="meme-image" alt="memes" />
        <h2 className="meme-text">{meme.bottomText}</h2>
      </div>

      <button onClick={getMemeImage} className="new-meme">
        Get new meme
      </button>
    </div>
  );
};

export default Memegenerator;
