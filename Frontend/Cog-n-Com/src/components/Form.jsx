import "../App.css";
import { PlaybackWithAttribution } from "./Playback";
import rockSample from "../assets/royaltyfree/Pump.mp3";
import popSample from "../assets/royaltyfree/Poofy Reel.mp3";
import jazzSample from "../assets/royaltyfree/Fast Talkin.mp3";

export default function Form() {
  return (
    <div className="musicForm">
      <h2>
        <i>Moods</i>
      </h2>
      <label>
        <input type="checkbox" name="Mood 1"></input>Mood 1
      </label>
      <label>
        <input type="checkbox" name="Mood 2"></input>Mood 2
      </label>
      <label>
        <input type="checkbox" name="Mood 3"></input>Mood 3
      </label>
      <br></br>
      <input
        type="text"
        placeholder="Are there any other moods? Enter it here! (separated by spaces)"
        size="100"
        style={{ fontSize: "15px" }}
      ></input>
      <h2>
        <i>Genres</i>
      </h2>
      <label>
        <input type="checkbox" name="Pop"></input>Pop
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={popSample}
        attribution={'"Poofy Reel" by Kevin MacLeod'}
      />
      <label>
        <input type="checkbox" name="Rock"></input>Rock
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={rockSample}
        attribution={'"Pump" by Kevin MacLeod'}
      />
      <label>
        <input type="checkbox" name="Jazz"></input>Jazz
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={jazzSample}
        attribution={'"Fast Talkin" by Kevin MacLeod'}
      />
      <button>Start Analysis</button>
    </div>
  );
}
