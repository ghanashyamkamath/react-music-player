import React,{useState,useRef} from 'react'
import "./styles/app.scss";
import data from './data'

import Song from './components/Song'
import Player from './components/Player'
import Library from './components/Library';
import Nav from './components/Nav';


function App() {
  //Ref
  const audioRef = useRef(null);
  //State

  const [songs,setSongs] = useState(data());
  const [currentSong,setCurrentSong] = useState(songs[0]);
  const [isPlaying,setIsPlaying] = useState(false);

  //State
  const [songInfo,setSongInfo] = useState({
    currentTime: 0,
    duration:0,
    animationPercentage:0,
  });

  const [libraryStatus,setLibraryStatus]=useState(false);

  const timeUpdateHandler = (e) =>{

    // console.log(e)
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // console.log(duration)
    //calculate %
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent/roundedDuration)*100)
    // console.log(animation)

    setSongInfo({...songInfo,currentTime:current,duration:duration,animationPercentage:animation})

  }

  const songEndHandler = async () =>{
    let currentIndex = songs.findIndex((song) => song.id===currentSong.id)
    
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

    if (isPlaying) audioRef.current.play()
      }
  return (

    <div className={`App ${libraryStatus ? 'library-active': ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong} />
      <Player audioRef={audioRef} songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} setSongInfo={setSongInfo} songInfo={songInfo} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong}/>
      <Library libraryStatus={libraryStatus} audioRef={audioRef} setSongs={setSongs} isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong}/>

      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
