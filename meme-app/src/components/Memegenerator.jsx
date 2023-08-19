import { useState, useEffect } from "react";
import axios from "axios";

const Memegenerator = () => {
  //initialize state for the top and bottom text of the meme
  const [topText, setToptext] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomnImage, setRandomnImage] = useState(
    "https://i.imgflip.com/1g8my4.jpg"
  );

  // initialize state for the entire meme component
  const [allMemes, setAllMemes] = useState([]);
  const memeUrl = "https:api.imgflip.com/get_memes";

  const fetchMemesFromApi = async () => {
    try {
      const response = await axios.get(memeUrl);
      setAllMemes(response.data.imageUrl);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchMemesFromApi();
  }, []); // useEffect handles functions with side effects like this one

  // to get meme images from an array of memes t
  const getMemeImage = () => {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setRandomnImage(url);
  };

  const handletopTextChange = (event) => {
    setToptext(event.target);
  };

  const handlebottomTextChange = (event) => {
    setToptext(event.target);
  };

  return (
    <div className="meme-component d-flex justify-content-center ">
      <div className="mb-3">
        <label htmlFor="forminput1" className="form-label">
          TopText
        </label>
        <input
          type="text"
          className="form-control"
          id="formcontrolinput"
          placeholder="toptext"
          value={topText}
          onChange={handletopTextChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="forminput1" className="form-labe2">
          BottomText
        </label>
        <input
          type="text"
          className="form-control"
          id="formcontrolinput"
          placeholder="bottomtext"
          value={bottomText}
          onChange={handlebottomTextChange}
        />
      </div>
      <button
        type="button"
        className="btn "
        style={{ backgroundColor: "#2c1762", padding: "10px", color: "white" }}
      >
        Primary
      </button>
    </div>
  );
};

export default Memegenerator;
