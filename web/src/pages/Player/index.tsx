import { useParams, useNavigate } from 'react-router-dom';
import { CaretCircleDoubleLeft, Spinner } from 'phosphor-react';

import { useGetVideoByIdQuery } from '../../redux/features/files/filesSlice';

import { Loader, VideoPlayer } from '../../Components';

import {
  PlayerContainer,
  GoBackButton,
  PlayerCenter,
  LoaderContainer,
} from './styles';

export function Player(){
  const { videoId } = useParams();
  const navigate = useNavigate();

  const {
    data: video,
    isLoading,
  } = useGetVideoByIdQuery(videoId);

  if(isLoading){
    return(
      <PlayerContainer>
        <LoaderContainer>
          <Loader.Icon icon={<Spinner weight="bold" />} />
          <Loader.Title>Loading video...</Loader.Title>
        </LoaderContainer>
      </PlayerContainer>
    )
  }

  if(!video){
    return(
      <PlayerContainer>
        <GoBackButton
          type="button"
          onClick={() => navigate(-1)}
        >
          <CaretCircleDoubleLeft weight="bold" />
          <span>Go back</span>
        </GoBackButton>
        <h1>This video does not exist!</h1>
      </PlayerContainer>
    )
  }

  return(
    <PlayerContainer>
      <GoBackButton
        type="button"
        onClick={() => navigate(-1)}
      >
        <CaretCircleDoubleLeft weight="bold" />
        <span>Go back</span>
      </GoBackButton>
      <PlayerCenter >
        <h1>{video.title}</h1>
        <VideoPlayer 
          video={video}
        />
      </PlayerCenter>
    </PlayerContainer>
  )
}