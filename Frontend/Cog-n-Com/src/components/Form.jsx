import "../App.css";
import { PlaybackWithAttribution } from "./Playback";
import rockSample from "../assets/royaltyfree/Pump.mp3";
import popSample from "../assets/royaltyfree/Poofy Reel.mp3";
import jazzSample from "../assets/royaltyfree/Fast Talkin.mp3";
import classicalSample from "../assets/royaltyfree/Danse Macabre - Light Dance.mp3";
import bluesSample from "../assets/royaltyfree/Porch Blues.mp3";

export default function Form(submitMethod) {
  return (
    <div className="musicForm">
      <h2>
        <i>Moods</i>
      </h2>
      <label>
        <input type="checkbox" name="Happy"></input>Happy
      </label>
      <label>
        <input type="checkbox" name="Sad"></input>Sad
      </label>
      <label>
        <input type="checkbox" name="Romantic"></input>Romantic
      </label>
      <label>
        <input type="checkbox" name="Chill"></input>Chill
      </label>
      <label>
        <input type="checkbox" name="Angry"></input>Angry
      </label>
      <label>
        <input type="checkbox" name="Focus"></input>Focus
      </label>
      <label>
        <input type="checkbox" name="Energetic"></input>Energetic
      </label>
      <label>
        <input type="checkbox" name="Chill"></input>Dreamy
      </label>
      <label>
        <input type="checkbox" name="Nostalgic"></input>Nostalgic
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
      <label>
        <input type="checkbox" name="Classical"></input>Classical
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={classicalSample}
        attribution={'"Danse Macabre - Light Dance" by Kevin MacLeod'}
      />
      <label>
        <input type="checkbox" name="Blues"></input>Blues
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={bluesSample}
        attribution={'"Porch Blues" by Kevin MacLeod'}
      />
      <label>
        <input type="checkbox" name="Lo-fi"></input>Lo-fi
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={jazzSample}
        attribution={'"Fast Talkin" by Kevin MacLeod'}
      />
      <label>
        <input type="checkbox" name="Hip-hop/Rap"></input>Hip-hop/Rap
      </label>
      <br></br>
      <PlaybackWithAttribution
        file={jazzSample}
        attribution={'"Fast Talkin" by Kevin MacLeod'}
      />
      <button type="button" onClick={() => submitMethod()}>
        Start Analysis
      </button>
    </div>
  );
}
