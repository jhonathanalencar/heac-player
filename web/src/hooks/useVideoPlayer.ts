import { ChangeEvent, RefObject, useCallback, useEffect, useState } from "react";

interface PlayerState{
  isPlaying: boolean;
  progress: number;
  isRepeating: boolean;
  speed: number;
  isMuted: boolean;
  minutesAmount: number;
  minutesPassed: number;
  volume: number;
  isFullscreen: boolean;
  isPictureInPicture: boolean;
}

interface UseVideoPlayerProps{
  videoRef: RefObject<HTMLVideoElement>;
}

export function useVideoPlayer({ videoRef }: UseVideoPlayerProps){
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isMuted: false,
    isRepeating: false,
    progress: 0,
    speed: 1,
    minutesAmount: 0,
    minutesPassed: 0,
    volume: 50,
    isFullscreen: false,
    isPictureInPicture: false,
  });

  function handleOnLoadedMetadata(){
    if(!videoRef.current){ return; }

    const minutesAmount = videoRef.current.duration;

    setPlayerState((prev) =>{
      return{
        ...prev,
        minutesAmount, 
      }
    });
  }

  function handleOnEnded(){
    if(!videoRef.current){ return; }

    setPlayerState((prev) =>{
      return{
        ...prev,
        isPlaying: false,
      }
    })
  }

  function togglePlay(){
    setPlayerState((prev) => {
      return {
        ...prev,
        isPlaying: !prev.isPlaying,
      }
    })
  }

  useEffect(() =>{
    playerState.isPlaying
      ? videoRef.current?.play()
      : videoRef.current?.pause()
  }, [playerState.isPlaying, videoRef]);

  function handleOnTimeUpdate(){
    if(!videoRef.current){ return; }

    const minutesPassed = videoRef.current.currentTime;
    const progress = (minutesPassed / videoRef.current.duration) * 100;

    setPlayerState((prev) =>{
      return{
        ...prev,
        progress,
        minutesPassed,
      }
    });
  }

  function handleVideoProgress(event: ChangeEvent<HTMLInputElement>){
    if(!videoRef.current){ return; }
    const manualChange = Number(event.target.value);

    const currentTime = (videoRef.current.duration / 100) * manualChange;
    videoRef.current.currentTime = currentTime;

    setPlayerState((prev) =>{
      return{
        ...prev,
        progress: manualChange,
        minutesPassed: currentTime,
      }
    });
  }

  const handleVideoSpeed = useCallback((speed: number) =>{
    if(!videoRef.current){ return; }

    videoRef.current.playbackRate = speed;

    setPlayerState((prev) =>{
      return{
        ...prev,
        speed,
      }
    });
  }, []);

  function handleOnChangeVolume(event: ChangeEvent<HTMLInputElement>){
    if(!videoRef.current){ return; }

    const volume = Number(event.target.value);

    videoRef.current.volume = volume / 100;

    setPlayerState((prev) =>{
      return{
        ...prev,
        volume,
      }
    })
  }

  function toggleMute(){
    setPlayerState((prev) =>{
      return{
        ...prev,
        isMuted: !prev.isMuted,
      }
    });
  }

  useEffect(() =>{
    if(!videoRef.current){ return; }

    playerState.isMuted
      ? videoRef.current.muted = true
      : videoRef.current.muted = false
  }, [playerState.isMuted, videoRef]);

  function handleToggleFullScreen(){
    if(!videoRef.current){ return; }

     setPlayerState((prev) =>{
      return{
        ...prev,
        isFullscreen: document.fullscreenElement ? true : false,
      }
    });
  }

  function handleFastForward(){
    if(!videoRef.current){ return; }

    const minutesPassed = videoRef.current.currentTime + 15;
    videoRef.current.currentTime = minutesPassed;

    setPlayerState((prev) =>{
      return{
        ...prev,
        minutesPassed,
      }
    })
  }

  function handleRewind(){
    if(!videoRef.current){ return; }

    const minutesPassed = videoRef.current.currentTime - 15;
    videoRef.current.currentTime = minutesPassed;
    
    setPlayerState((prev) =>{
      return{
        ...prev,
        minutesPassed,
      }
    })
  }

  function handleRepeat(){
    if(!videoRef.current){ return; }
    
    setPlayerState((prev) =>{
      return{
        ...prev,
        isRepeating: !prev.isRepeating,
      }
    });
  }

  useEffect(() =>{
    if(!videoRef.current){ return; }

    playerState.isRepeating
      ? videoRef.current.loop = true
      : videoRef.current.loop = false
  }, [playerState.isRepeating, videoRef]);

  async function handleRequestPictureInPicture(){
    if(!videoRef.current){ return; }

    try{
      if(!document.pictureInPictureElement){
        await videoRef.current.requestPictureInPicture();
        setPlayerState((prev) =>{
          return{
            ...prev,
            isPictureInPicture: true,
          }
        });
      }else{
        await document.exitPictureInPicture();
        setPlayerState((prev) =>{
          return{
            ...prev,
            isPictureInPicture: false,
          }
        });
      }
    }catch(error){
      console.log(error)
    }
  }

  return{
    playerState,
    toggleMute,
    togglePlay,
    handleOnLoadedMetadata,
    handleOnEnded,
    handleOnTimeUpdate,
    handleVideoProgress,
    handleVideoSpeed,
    handleOnChangeVolume,
    handleToggleFullScreen,
    handleFastForward,
    handleRewind,
    handleRepeat,
    handleRequestPictureInPicture,
  }
}