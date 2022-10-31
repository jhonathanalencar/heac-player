import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, CircleNotch } from 'phosphor-react';

import fallbackBanner from '../../assets/fallback.png';

import { FileType } from '../../pages/Home';
import { useDeleteUploadedFileMutation } from '../../redux/features/files/filesSlice';

import { Loader } from '../Loader';

import {
  FileCardContainer,
  DeleteButton,
  LoaderContainer,
} from './styles';

interface FileCardProps{
  data: FileType;
}

export function FileCard({ data: {_id: id, title, thumbnailUrl} }: FileCardProps){
  const [deleteUploadedFile, { isLoading }] = useDeleteUploadedFileMutation();
  
  const navigate = useNavigate();
  
  function handleClick(event: MouseEvent){
    event.stopPropagation();

    try{
      deleteUploadedFile(id).unwrap();
    }catch(error){
      console.log(error);
    }
  }
  
  return(
    <FileCardContainer onClick={() => navigate(`video/${id}`)}>
      <img 
        src={thumbnailUrl ?? fallbackBanner} 
        alt="thumbnail" 
      />
        
      <strong>{title}</strong>
      
      <DeleteButton 
        type="button"
        onClick={(e) => handleClick(e)}
        disabled={isLoading}
      >
        <XCircle weight="bold" />
      </DeleteButton>

      {isLoading && (
        <LoaderContainer>
          <Loader.Icon icon={<CircleNotch weight="bold" />} />
        </LoaderContainer>
      )}
    </FileCardContainer>
  )
}