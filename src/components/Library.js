import { library } from '@fortawesome/fontawesome-svg-core';
import React from 'react'
import LibrarySong from './LibrarySong'


const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? 'active-library':''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            setSongs={setSongs}
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