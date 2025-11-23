import { useEffect, useRef } from "react";
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
      <span>Playback: {file.name}</span>
      <img
        src={rightButton}
        alt="Go to the next file"
        className="playbackArrow"
        onClick={() => changeFileIndex(1)}
      />
      <br></br>
      <Playback file={URL.createObjectURL(file)} />
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
  const playback = useRef(null);
  useEffect(() => {
    const isPlaying = !playback.current.paused;
    playback.current.load();
    if (isPlaying) {
      playback.current.play();
    }
  }, [file]);

  return (
    <audio ref={playback} controls>
      <source src={file} type={file.type} />
      Your browser does not support the audio element.
    </audio>
  );
}
