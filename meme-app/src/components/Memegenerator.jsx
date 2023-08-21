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

  const [imageUrl, setImageUrl] = useState(null);

  const downloadImage = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        // Extract the filename from the URL
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        // Set the download attribute and filename
        link.setAttribute("download", filename);
        document.body.appendChild(link);

        // Simulate a click on the anchor element to start the download
        link.click();

        // Clean up the temporary anchor element
        link.parentNode.removeChild(link);

        // Set the downloaded image URL to display on the page
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error downloading image:", error);
      });
  };

  // const handleDownload = () => {
  //   const imageUrl = meme.randomnImage; // Replace with your image URL
  //   downloadImage(imageUrl);
  //   setImageUrl(imageUrl);
  // };
  // // ... (Other parts of your code)

  const handleDownload = () => {
    const image = new Image();
    image.crossOrigin = "anonymous"; // Allow cross-origin loading
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      // Draw the image on the canvas
      context.drawImage(image, 0, 0);

      // Draw the top text
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(meme.topText, canvas.width / 2, 40);

      // Draw the bottom text
      context.fillText(meme.bottomText, canvas.width / 2, canvas.height - 20);

      // Convert the canvas content to a data URL
      const dataUrl = canvas.toDataURL("image/png");

      // Create a temporary anchor element for download
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "meme.png"; // Set the filename

      // Simulate a click on the anchor element to start the download
      link.click();

      // After download, set the image URL for display
      downloadImage(meme.randomnImage);
      setImageUrl(meme.randomnImage);
    };

    image.src = meme.randomnImage;
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

      <div className="container">
        <h3>Download the meme</h3>
        <button onClick={handleDownload}>Download Image</button>
        {imageUrl && <img src={imageUrl} alt="Downloaded Image" />}
      </div>
    </div>
  );
};

export default Memegenerator;
