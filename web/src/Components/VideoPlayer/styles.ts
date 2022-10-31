import styled from "styled-components";

interface VideoPlayerContainerProps{
  isPlaying: boolean;
}

export const VideoPlayerContainer = styled.section<VideoPlayerContainerProps>`
  max-width: 60rem;
  display: flex;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
  margin-inline: auto;
  border-radius: 0.25rem;
  border: 0.15rem solid ${(props) => props.theme['red-400']};
  box-shadow: 0.1rem 0.1rem 0.35rem ${(props) => props.theme.black};

  &:fullscreen{
    border: none;
  }

  &:fullscreen:nth-child(2){
    >div{
      transform: ${(props) => props.isPlaying ? 'translateY(100%)' : 'translateY(0)'};
      opacity: ${(props) => props.isPlaying ? 0 : 1};
    }
  }

  video{
   width: 100%;
   height: 100%;
  }
`;

export const PlayPauseAnimation = styled.div`
  position: absolute;
  display: flex;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  justify-content: center;
  align-items: center;
  opacity: 0;
  animation: fade 0.5s ease-in-out;

  svg{
    height: 3rem;
    width: 3rem;
    color: ${(props) => props.theme['blue-900']};
    background-color: ${(props) => props.theme['gray-800']};
    border-radius: 50%;

    @media (min-width: 30em){
      height: 6rem;
      width: 6rem;
    }
  }

  @keyframes fade{
    from{
      opacity: 1;
      transform: translate(-50%, -50%), scale(1);
    }

    to{
      opacity: 0;
      transform: translate(-50%, -50%), scale(1.3);
    }
  }
`;

export const VideoPlayerControlsContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  position: absolute;
  inset: 0;
  width: 100%;

  &:is(:hover, :focus-within){
    >div{
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export const VideoPlayerControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.25rem;
  padding: 0.5rem;
  width: 100%;
  max-width: 600px;

  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0 0.5rem 2rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.18);
  transform: translateY(100%);
  opacity: 0;
  
  transition: all 0.5s ease-in-out;

  @media (min-width: 30em){
    padding: 1rem;
  }
`;

interface ProgressBarProps{
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  flex: 1;
  width: 100%;
  padding-inline: 0.5rem;
  padding-bottom: 0.4rem;
  border-radius: 0.5rem;

  &:is(:hover, :focus-within){
    background-color: rgba(0, 0, 0, 0.35);
  }

  > input[type="range"]{
    width: 100%;
    -webkit-appearance: none !important;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 0.25rem;
    height: 0.25rem;
    cursor: pointer;
    position: relative;

    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      min-width: 0.5rem;
      width: ${(props) => `${props.progress}%`};
      height: 100%;
      background-color: ${(props) => props.theme['blue-900']};
      border-radius: 0.25rem;
    }

    &::-webkit-slider-runnable-track{
      padding-block: 0.5rem;
    }

    &::-webkit-slider-thumb{
      -webkit-appearance: none !important;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme['blue-900']};
      cursor: pointer;
    }

    &:hover::-webkit-slider-thumb,
    &:hover::before{
      filter: brightness(1.1);
    }

    &:active::-webkit-slider-thumb,
    &:active::before{
      filter: brightness(0.9);
    }
  }
`;

export const ControlsActions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 30em){
    flex-direction: row;
  }
`;

export const LeftActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  align-self: flex-start;

  span{
    color: ${(props) => props.theme['gray-400']};
    font-weight: bold;
    font-size: 1rem;
  }
`;

export const PlayPauseButton = styled.button`
  display: inline-flex;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.5rem;

  &:is(:hover, :focus){
    background-color: rgba(0, 0, 0, 0.35);
  }
  
  svg{
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme['blue-900']};
  }
`;

export const RightActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface VolumeContainerProps{
  volume: number;
}

export const VolumeContainer = styled.div<VolumeContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: transparent;
  border-radius: 0.5rem;
  padding-inline: 0.5rem;

  &:is(:hover, :focus-within){
    background-color: rgba(0, 0, 0, 0.35);

    input[type="range"]{
      width: 3rem;
      opacity: 1;
    }
  }

  input[type="range"]{
    -webkit-appearance: none !important;
    background-color: ${(props) => props.theme['gray-700']};
    border-radius: 0.25rem;
    height: 0.25rem;
    cursor: pointer;
    position: relative;
    width: 0;
    opacity: 0;
    transition: all 0.3s ease;

    &::before{
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: ${(props) => props.volume}%;
      height: 100%;
      background-color: ${(props) => props.theme['blue-900']};
      border-radius: 0.25rem;
    }

    &::-webkit-slider-runnable-track{
      padding-block: 0.5rem;
    }

    &::-webkit-slider-thumb{
      -webkit-appearance: none !important;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: ${(props) => props.theme['blue-900']};
      cursor: pointer;
    }

    &:focus{
      width: 3rem;
      opacity: 1;
    }
  }

  button{
    border: none;
    background: none;
    display: inline-flex;
    padding: 0.25rem;
    cursor: pointer;

    svg{
      height: 1.5rem;
      width: 1.5rem;
      color: ${(props) => props.theme['blue-900']};
    }
  }
`;

const Button = styled.button`
  display: inline-flex;
  padding: 0.25rem;
  border: none;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;

  &:is(:hover, :focus){
    background-color: rgba(0, 0, 0, 0.35);
  }
  
  svg{
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.theme['blue-900']};
  }

  &:active{
    svg{
      color: ${(props) => props.theme['red-400']};
    }
  }
`;

export const FullScreenButton = styled(Button)``;

export const OptionsButton = styled(Button)`
  position: relative;
`;

export const RewindButton = styled(Button)``;

export const FastForwardButton = styled(Button)``;

interface RepeatButtonProps{
  isRepeating: boolean;
}

export const RepeatButton = styled(Button)<RepeatButtonProps>`
  svg{
    color: ${(props) => props.isRepeating ? props.theme['red-400'] : props.theme['blue-900']};
  }
`;