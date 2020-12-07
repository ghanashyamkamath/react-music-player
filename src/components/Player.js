import React , {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay,faAngleLeft,faAngleRight,faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ audioRef, currentSong, isPlaying, setIsPlaying,setSongInfo, songInfo}) => {
  
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



  
  const getTime = (time) =>{
    return(
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    )
  }

  

  return (
    <div className="players">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <input onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} type="range" />
        <p>{getTime(songInfo.duration)}</p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />

        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          size="2x"
          icon={isPlaying? faPause : faPlay}
        />

        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      


    </div>
  );
};
export default Player