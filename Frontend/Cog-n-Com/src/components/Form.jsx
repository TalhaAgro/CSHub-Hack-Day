import "../App.css";

export default function Form() {
  return (
    <div>
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
      <h2>
        <i>Genres</i>
      </h2>
      <label>
        <input type="checkbox" name="Pop"></input>Pop
      </label>
      <label>
        <input type="checkbox" name="Rock"></input>Rock
      </label>
      <label>
        <input type="checkbox" name="Jazz"></input>Jazz
      </label>
      <br />
      <button>Start Analysis</button>
    </div>
  );
}
