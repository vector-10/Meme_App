import { useState, useEffect } from "react";
// import axios from "axios";

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
  // const fetchMemesFromApi = async () => {
  //   try {
  //     const response = await axios.get(memeUrl)
  //     .then()
  //     setAllMemes(response.data.memes);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  useEffect(() => {
    async function fetchMemesFromApi() {
      const res = await fetch(memeUrl);
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    fetchMemesFromApi();
  }, []); // useEffect handles functions with side effects like this API call

  // to get meme images from an array of memes t
  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  };
  console.log(getMemeImage);

  const handleChange = (event) => {
    const { name, value } = event.target.value;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
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
          onChange={handleChange}
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
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="meme">
        <h2 className="meme-text-top">{meme.topText}</h2>
        <img src={meme.randomnImage} className="meme-image" alt="memes" />
        <h2 className="meme-text-bottom">{meme.bottomText}</h2>
      </div>

      <button onClick={getMemeImage} className="new-meme">
        Get new meme
      </button>
    </div>
  );
};

export default Memegenerator;
