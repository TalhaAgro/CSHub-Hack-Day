import "../App.css";
import { useState, useEffect, useRef } from "react";
import { PlaybackWithAttribution } from "./Playback";
import rockSample from "../assets/royaltyfree/Pump.mp3";
import popSample from "../assets/royaltyfree/Poofy Reel.mp3";
import jazzSample from "../assets/royaltyfree/Fast Talkin.mp3";
import classicalSample from "../assets/royaltyfree/Danse Macabre - Light Dance.mp3";
import bluesSample from "../assets/royaltyfree/Porch Blues.mp3";
import lofiSample from "../assets/royaltyfree/Avanti - Time (freetouse.com).mp3";
import hiphopSample from "../assets/royaltyfree/Zambolino - Above The Sky (freetouse.com).mp3";

export default function Form({ submitMethod, loadingResults }) {
  const [moodInputs, setMoodInputs] = useState({});
  const [genreInputs, setGenreInputs] = useState({});
  const submitButton = useRef(null);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name.indexOf("Mood_") == 0) {
      setMoodInputs((values) => ({
        ...values,
        [name.replace("Mood_", "").toLowerCase()]: value,
      }));
    } else if (name.indexOf("Genre_") == 0) {
      setGenreInputs((values) => ({
        ...values,
        [name.replace("Genre_", "").toLowerCase()]: value,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    submitMethod(moodInputs, genreInputs);
  };

  useEffect(() => {
    if (loadingResults === false) {
      submitButton.current.disabled = false;
    } else {
      submitButton.current.disabled = true;
    }
  }, [loadingResults]);

  return (
    <form className="musicForm" onSubmit={handleSubmit}>
      <h2>
        <i>Moods</i>
      </h2>
      <label>
        <input
          type="checkbox"
          name="Mood_Happy"
          checked={
            moodInputs["happy"] !== undefined ? moodInputs["happy"] : false
          }
          onChange={handleChange}
        ></input>
        Happy
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Sad"
          checked={moodInputs["sad"]}
          onChange={handleChange}
        ></input>
        Sad
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Romantic"
          checked={
            moodInputs["romantic"] !== undefined
              ? moodInputs["romantic"]
              : false
          }
          onChange={handleChange}
        ></input>
        Romantic
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Chill"
          checked={
            moodInputs["chill"] !== undefined ? moodInputs["chill"] : false
          }
          onChange={handleChange}
        ></input>
        Chill
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Angry"
          checked={
            moodInputs["angry"] !== undefined ? moodInputs["angry"] : false
          }
          onChange={handleChange}
        ></input>
        Angry
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Focus"
          checked={
            moodInputs["focus"] !== undefined ? moodInputs["focus"] : false
          }
          onChange={handleChange}
        ></input>
        Focus
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Energetic"
          checked={
            moodInputs["energetic"] !== undefined
              ? moodInputs["energetic"]
              : false
          }
          onChange={handleChange}
        ></input>
        Energetic
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Chill"
          checked={
            moodInputs["dreamy"] !== undefined ? moodInputs["dreamy"] : false
          }
          onChange={handleChange}
        ></input>
        Dreamy
      </label>
      <label>
        <input
          type="checkbox"
          name="Mood_Nostalgic"
          checked={
            moodInputs["nostalgic"] !== undefined
              ? moodInputs["nostalgic"]
              : false
          }
          onChange={handleChange}
        ></input>
        Nostalgic
      </label>
      <br></br>
      <input
        type="text"
        placeholder="Are there any other moods? Enter it here! (separated by spaces)"
        size="100"
        name="Mood_Others"
        style={{ fontSize: "15px" }}
        value={moodInputs["others"] !== undefined ? moodInputs["others"] : ""}
        onChange={handleChange}
      ></input>
      <h2>
        <i>Genres</i>
      </h2>
      <label>
        <input
          type="checkbox"
          name="Genre_Pop"
          checked={genreInputs.pop !== undefined ? genreInputs["pop"] : false}
          onChange={handleChange}
        ></input>
        Pop
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={popSample}
        attribution={'"Poofy Reel" by Kevin MacLeod'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Rock"
          checked={genreInputs.rock !== undefined ? genreInputs["rock"] : false}
          onChange={handleChange}
        ></input>
        Rock
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={rockSample}
        attribution={'"Pump" by Kevin MacLeod'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Jazz"
          checked={genreInputs.jazz !== undefined ? genreInputs["jazz"] : false}
          onChange={handleChange}
        ></input>
        Jazz
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={jazzSample}
        attribution={'"Fast Talkin" by Kevin MacLeod'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Classical"
          checked={
            genreInputs.classical !== undefined
              ? genreInputs["classical"]
              : false
          }
          onChange={handleChange}
        ></input>
        Classical
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={classicalSample}
        attribution={'"Danse Macabre - Light Dance" by Kevin MacLeod'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Blues"
          checked={
            genreInputs.blues !== undefined ? genreInputs["blues"] : false
          }
          onChange={handleChange}
        ></input>
        Blues
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={bluesSample}
        attribution={'"Porch Blues" by Kevin MacLeod'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Lo-fi"
          checked={
            genreInputs["lo-fi"] !== undefined ? genreInputs["lo-fi"] : false
          }
          onChange={handleChange}
        ></input>
        Lo-fi
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={lofiSample}
        attribution={'"Time" by Avanti'}
      />
      <label>
        <input
          type="checkbox"
          name="Genre_Hip-hop/Rap"
          checked={
            genreInputs["hip-hop/rap"] !== undefined
              ? genreInputs["hip-hop/rap"]
              : false
          }
          onChange={handleChange}
        ></input>
        Hip-hop/Rap
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={hiphopSample}
        attribution={'"Above The Sky" by Zambolino'}
      />
      <button type="submit" ref={submitButton}>
        Start Analysis
      </button>
    </form>
  );
}
