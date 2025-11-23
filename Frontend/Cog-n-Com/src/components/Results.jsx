import "../App.css";

export default function Results({ bestResult, recommendations }) {
  return (
    <div>
      <p>
        {bestResult !== null
          ? "This is the closest-matching track to the one you’re looking for:"
          : "We seem to be unable to find any matching songs in the database."}
      </p>
      {bestResult !== null ? <Songs songs={[bestResult]} /> : null}
      <p>Here are the best 3 song recommendations closest to your song:</p>
      <Songs songs={recommendations} />
    </div>
  );
}

function Song({ name, artists, year, links }) {
  return (
    <div className="song">
      <h2>{name}</h2>
      <p>Artist(s): {artists}</p>
      <p>Year: {year}</p>
      {Array.isArray(links) ? (
        links.map((link, index) => {
          return (
            <p key={index}>
              Link {index}: <a href={link}>{link}</a>
            </p>
          );
        })
      ) : typeof links === "string" ? (
        <p>
          Link: <a href={link}>{link}</a>
        </p>
      ) : null}
      <p>Play the song links:</p>
    </div>
  );
}

function Songs({ songs }) {
  return (
    <div className="songsFlexbox">
      {songs.map((song, index) => (
        <Song
          name={song.name}
          artists={song.artists}
          year={song.year}
          links={song.links}
        />
      ))}
    </div>
  );
}
