import { filesize } from 'filesize';

import {
  FileInfoContainer,
  FileInfoDetails,
  FilePreview,
} from './styles';

interface FileInfoProps{
  file: File;
}

export function FileInfo({ file }: FileInfoProps){
  return(
    <FileInfoContainer>
      {file.type.includes('image') ? (
        <FilePreview>
          <img src={URL.createObjectURL(file)} alt="thumbnail" />
        </FilePreview>
      ) : (
        <FilePreview>
          <video src={URL.createObjectURL(file)} controls />
        </FilePreview>
      )}
      <FileInfoDetails>
        <strong>{file.name}</strong>
        <span>{String(filesize(file.size, {base: 2, standard: "jedec"}))}</span>
      </FileInfoDetails>
    </FileInfoContainer>
  )
}