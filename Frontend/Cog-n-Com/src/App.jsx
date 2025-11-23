import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import cogNComLogo from "./assets/templogo.png";
import minhPhoto from "./assets/linkedin/minh.jpg";
import violaPhoto from "./assets/linkedin/viola.jpg";
import talhaPhoto from "./assets/linkedin/talha.jpg";
import uploadIcon from "./assets/Upload.png";
import { UserAudioPlayback } from "./components/Playback";
import Form from "./components/Form";
import Results from "./components/Results";
import "./App.css";

function App() {
  const errorTextRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState("Placeholder");
  const fileInputRef = useRef(null); // Hidden file input button
  const [audioFileHistory, setAudioHistory] = useState([]); // Audio file history array. New files get appended to the end.
  const [fileHistoryIndex, setFileHistoryIndex] = useState(0); // [0, +inf) ; The current index of the audio file history for playback
  const [showResults, setShowResults] = useState(false);

  const showErrorWithTimeout = () => {
    setShowError(true);
    // Dismount LINK_ERROR_TEXT after 10 seconds
    const TIMEOUT = 10000; // 10 seconds
    const timeOutPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(), TIMEOUT);
    });
    timeOutPromise.then(() => setShowError(false));
  };

  // Function to handle the click on the custom div
  const handleDivClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg"];
      const selectedFile = event.target.files[0];
      if (!allowedTypes.includes(selectedFile.type)) {
        console.log("Invalid file format (mp3, ogg, wav)");
        setErrorText("Invalid file format (mp3, ogg, wav)");
        showErrorWithTimeout();
        return;
      }
      setAudioHistory(audioFileHistory.concat(selectedFile)); // Append the selected file
    }
  };

  useEffect(() => {
    if (audioFileHistory.length > 0) {
      setFileHistoryIndex(audioFileHistory.length - 1);
    }
  }, [audioFileHistory]);

  const changeFileHistoryIndex = (change) => {
    if (typeof change === "number" && Number.isInteger(change)) {
      if (
        fileHistoryIndex + change >= 0 &&
        fileHistoryIndex + change < audioFileHistory.length
      ) {
        setFileHistoryIndex(fileHistoryIndex + change);
      }
    }
  };

  return (
    <>
      <div>
        <img src={cogNComLogo} className="logo" alt="Cog 'n' Com logo" />
      </div>
      <h1>Cog 'n' Com</h1>
      <h2 id="CogNComSubheading">
        A Music Re<span className="brand">cog</span>nition{" "}
        <span className="brand">&</span> Re<span className="brand">com</span>
        mendation Webapp
      </h2>
      <div>
        <div id="uploadAudio" onClick={handleDivClick}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the default input
          />
          <img src={uploadIcon}></img>
          <p>
            Upload Audio
            <br />
            (Optional)
          </p>
        </div>

        {showError ? (
          <p id="errorText" ref={errorTextRef}>
            {errorText}
          </p>
        ) : null}
      </div>
      {audioFileHistory.length > 0 ? (
        <UserAudioPlayback
          file={audioFileHistory[fileHistoryIndex]}
          changeFileIndex={changeFileHistoryIndex}
        />
      ) : null}
      <Form />
      {showResults ? <Results /> : null}
      <hr></hr>
      <div className="devs">
        <h1>Meet the Devs!</h1>
        <div className="devsContainer">
          <div>
            <img src={talhaPhoto} alt="Talha Agro's Photo"></img>
            <h3>Talha Agro</h3>
            <p>Gemini Developer</p>
          </div>
          <div>
            <img src={violaPhoto} alt="Viola Sergyous's Photo"></img>
            <h3>Viola Sergyous</h3>
            <p>Developer</p>
          </div>
          <div>
            <img src={minhPhoto} alt="Nhat Minh Phan's Photo"></img>
            <h3>Nhat Minh Phan</h3>
            <p>Front-end Developer, Designer</p>
          </div>
        </div>
      </div>
      <hr></hr>
      <p>© Cog 'n' Com Devs, 2025</p>
      <p>Devpost</p>
    </>
  );
}

export default App;
