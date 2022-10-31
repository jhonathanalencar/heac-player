import { useEffect, useRef, useState } from 'react';
import { CornersIn, CornersOut, DotsThreeOutlineVertical, FastForward, Pause, PauseCircle, Play, PlayCircle, Repeat, Rewind, SpeakerHigh, SpeakerSlash } from 'phosphor-react';

import { useVideoPlayer } from '../../hooks/useVideoPlayer';
import { FileType } from '../../pages/Home';

import { Dropdown } from '../Dropdown';

import {
  VideoPlayerContainer,
  VideoPlayerControlsContainer,
  VideoPlayerControls,
  ControlsActions,
  LeftActionsContainer,
  RightActionsContainer,
  PlayPauseButton,
  ProgressBar,
  VolumeContainer,
  FullScreenButton,
  OptionsButton,
  RepeatButton,
  FastForwardButton,
  RewindButton,
  PlayPauseAnimation,
} from './styles';

interface VideoPlayerProps{
  video: FileType;
}

export function VideoPlayer({ video }: VideoPlayerProps){
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false);
  const [playPauseAnimation, setPlayPauseAnimation] = useState(false);
  const videoPlayerContainerRef = useRef<HTMLElement | null>(null);

  const {
    playerState,
    togglePlay,
    toggleMute,
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
  } = useVideoPlayer({videoRef});

  function formatSecondsToMinutes(secondsAmount: number){
    const minutes = Math.floor(secondsAmount / 60);
    const seconds = Math.floor(secondsAmount % 60);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  function handleCloseOnPressEscape(event: KeyboardEvent){
    if(event.code === 'Escape'){ 
      setIsOptionsMenuOpen(false);
    }
  }

  useEffect(() =>{
    window.addEventListener('keydown', handleCloseOnPressEscape);

    return () =>{
      window.removeEventListener('keydown', handleCloseOnPressEscape);
    }
  }, []);

  function handleFullScreen(){
    if(!videoPlayerContainerRef.current){
      return;
    }

    if(document.fullscreenElement){
      document.exitFullscreen();
    }else{
      videoPlayerContainerRef.current.requestFullscreen();
    }
  }

  useEffect(() =>{
    if(!videoPlayerContainerRef.current){
      return;
    }

    videoPlayerContainerRef.current.onfullscreenchange = handleToggleFullScreen;
  }, []);

  function handlePlayPause(){
    togglePlay();
    setPlayPauseAnimation(true);
  }
 
  return(
    <VideoPlayerContainer 
      ref={videoPlayerContainerRef}
      isPlaying={playerState.isPlaying} 
      onClick={handlePlayPause}
    >
        <video 
          ref={videoRef}
          src={video.url}
          poster={video.thumbnailUrl}
          onTimeUpdate={handleOnTimeUpdate}
          onLoadedMetadata={handleOnLoadedMetadata}
          onEnded={handleOnEnded}
        />

        <VideoPlayerControlsContainer>
          <VideoPlayerControls onClick={(e) => e.stopPropagation()}>
            <ProgressBar progress={playerState.progress}>
              <input 
                type="range"
                min="0"
                max="100"
                value={playerState.progress}
                onChange={(e) => handleVideoProgress(e)}
              />
            </ProgressBar>
            <ControlsActions onClick={(e) => e.stopPropagation()}>
              <LeftActionsContainer>
                <PlayPauseButton 
                  onClick={togglePlay}
                  aria-label={playerState.isPlaying ? 'Play' : 'Pause'}
                >
                  {!playerState.isPlaying ? (
                    <Play weight="fill" />
                  ) : (
                    <Pause weight="fill" />
                  )}
                </PlayPauseButton>
                <span>
                  {formatSecondsToMinutes(playerState.minutesPassed)} / {formatSecondsToMinutes(playerState.minutesAmount)}
                </span>
              </LeftActionsContainer>

              <RightActionsContainer>
                <RewindButton onClick={handleRewind}>
                  <Rewind weight="fill" />
                </RewindButton>

                <FastForwardButton onClick={handleFastForward}>
                  <FastForward weight="fill" />
                </FastForwardButton>

                <RepeatButton onClick={handleRepeat} isRepeating={playerState.isRepeating}>
                  <Repeat weight={playerState.isRepeating ? 'bold' : 'regular'} />
                </RepeatButton>

                <VolumeContainer volume={playerState.volume}>
                  <input 
                    type="range"
                    min="0"
                    max="100" 
                    value={playerState.volume}
                    onChange={handleOnChangeVolume}
                  />

                  <button
                    onClick={toggleMute}
                  >
                    {!playerState.isMuted ? (
                      <SpeakerHigh weight="fill" />
                    ) : (
                      <SpeakerSlash weight="fill" />
                    )}
                  </button>
                </VolumeContainer>

                <FullScreenButton
                  type="button"
                  onClick={handleFullScreen}
                >
                  {!playerState.isFullscreen ? (
                    <CornersOut weight="bold" />
                    ) : (
                    <CornersIn weight="bold" />
                  )}
                </FullScreenButton>
                <OptionsButton
                  type="button"
                  onClick={() => setIsOptionsMenuOpen((prev) => !prev)}
                >
                  <DotsThreeOutlineVertical weight="fill" />
                  <Dropdown 
                    isOpen={isOptionsMenuOpen} 
                    handleVideoSpeed={handleVideoSpeed}
                    videoUrl={video.url}
                    speed={playerState.speed}
                    isPictureInPicture={playerState.isPictureInPicture}
                    handleRequestPictureInPicture={handleRequestPictureInPicture}
                  />
                </OptionsButton>
              </RightActionsContainer>
            </ControlsActions>
          </VideoPlayerControls>
        </VideoPlayerControlsContainer>

        {playPauseAnimation && (
          <PlayPauseAnimation
            onAnimationEnd={() => setPlayPauseAnimation(false)}
          >
            {!playerState.isPlaying  ? (
              <PlayCircle weight="fill" />
            ) : (
              <PauseCircle weight="fill" />
            )}
          </PlayPauseAnimation>
        )}
    </VideoPlayerContainer>
  )
}