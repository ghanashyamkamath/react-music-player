import React , {useState,useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faAngleLeft,faAngleRight,faPause } from "@fortawesome/free-solid-svg-icons";
import {playAudio} from '../util'

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying,setSongInfo, songInfo,songs,setCurrentSong,setSongs}) => {

  //UseEffect
  useEffect(() => {
    //Add active state
    const newSongs =songs.map((song) => {
      if(song.id === currentSong.id){
        return{
          ...song,
          active:true,
        };

      }else{
        return{
          ...song,
          active:false,
        }
      }
    })
    setSongs(newSongs);

  },[currentSong]);
  
  //Event Handlers
  const playSongHandler = () => {
    if(isPlaying){

          audioRef.current.pause();
          setIsPlaying(!isPlaying)

    }
    else{
          audioRef.current.play();
          setIsPlaying(!isPlaying);


    }

  };

  const dragHandler = (e) =>{


    // console.log(e)
    audioRef.current.currentTime = e.target.value
    setSongInfo({...songInfo , currentTime : e.target.value})

  }
  const skipTrackHandler = (direction) =>{
    let currentIndex = songs.findIndex((song) => song.id===currentSong.id)
    if(direction === 'skip-forward'){
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
      // console.log(`next index ${currentIndex + 1}`)
      // console.log(`songs length ${songs.length + 1}`)


    }
    if(direction === 'skip-back'){
      if((currentIndex - 1) % songs.length === -1){
        setCurrentSong(songs[songs.length - 1]);
            playAudio(isPlaying, audioRef);

        return;
      }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);

      
    }
    playAudio(isPlaying,audioRef);

    

  }



  
  const getTime = (time) =>{
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }
  //add styles

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`
  }

  

  return (
    <div className="players">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>

        <div style={{background : `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} className="track">
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            type="range"
          />

          <div style={trackAnim} className="animate-track"></div>
        </div>
        <p>{songInfo.duration? getTime(songInfo.duration): "0:00"}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />

        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
    </div>
  );
};
export default Player