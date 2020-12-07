import React,{useState,useRef} from 'react'
import "./styles/app.scss";
import data from './util'

import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library';


function App() {
  //Ref
  const audioRef = useRef(null);
  //State

  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong={setCurrentSong}] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);

  //State
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration:0,
  });

  const timeUpdateHandler = (e) =>{

    // console.log(e)
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(duration)
    setSongInfo({...songInfo,currentTime:current,duration:duration})

  }
  return (

    <div className="App">
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} setSongInfo={setSongInfo} songInfo={songInfo} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library audioRef={audioRef} setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong}/>

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
