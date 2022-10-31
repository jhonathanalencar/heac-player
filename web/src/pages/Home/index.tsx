import { Spinner } from 'phosphor-react';

import { useGetUploadedFilesQuery } from '../../redux/features/files/filesSlice';

import { FileCard, Loader, ErrorMessage } from "../../Components";

import {
  HomeContainer,
  FilesContainer,
  LoaderContainer,
} from './styles';

export type FileType = {
  _id: string;
  title: string;
  key: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  createdAt: Date;
}

export function Home(){
  const {
    data: videos,
    isLoading,
    isError,
  } = useGetUploadedFilesQuery();

  if(isLoading){
    return (
      <LoaderContainer>
        <Loader.Icon icon={<Spinner weight="bold" />} />
        <Loader.Title>Loading...</Loader.Title>
      </LoaderContainer>
    )
  }

  if(isError || !videos){
    return <ErrorMessage />
  }

  return(
    <HomeContainer>
      <FilesContainer>
        {videos.length > 0 ? (
          videos.map((video) =>{
            return(
              <FileCard 
                key={video._id}
                data={video}
              />
            )
          })
        ) : (
          <ErrorMessage message="No videos found." />
        )}
      </FilesContainer>
    </HomeContainer>
  )
}