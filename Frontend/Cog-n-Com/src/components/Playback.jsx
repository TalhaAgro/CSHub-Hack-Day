import "../App.css";
import leftButton from "../assets/History_left.png";
import rightButton from "../assets/History_right.png";

export function UserAudioPlayback({ file, changeFileIndex }) {
  return (
    <div>
      <img
        src={leftButton}
        alt="Go to the previous file"
        className="playbackArrow"
        onClick={() => changeFileIndex(-1)}
      />
      <span>Playback: </span>
      <img
        src={rightButton}
        alt="Go to the next file"
        className="playbackArrow"
        onClick={() => changeFileIndex(1)}
      />
      <br></br>
      <Playback file={file} />
    </div>
  );
}

export function PlaybackWithAttribution({ file, attribution }) {
  return (
    <div>
      <Playback file={file} />
      <h5>{attribution}</h5>
    </div>
  );
}

export default function Playback({ file }) {
  return (
    <audio controls>
      <source src={file} type={file.type} />
      Your browser does not support the audio element.
    </audio>
  );
}
