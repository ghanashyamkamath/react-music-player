import React from 'react'
import LibrarySong from './LibrarySong'


const Library = ({ songs, setCurrentSong, audioRef, isPlaying }) => {
  return (
    <div className="library">
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            isPlaying={isPlaying}
            songs={songs}
            id={song.id}
            key={song.id}
            setCurrentSong={setCurrentSong}
            song={song}
            audioRef={audioRef}
          />
        ))}
      </div>
    </div>
  );
};
export default Library;