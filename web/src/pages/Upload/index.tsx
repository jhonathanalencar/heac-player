import { FormEvent, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CaretLeft, CaretRight, CheckCircle, LinkSimple, UploadSimple, XCircle } from "phosphor-react";

import { api } from "../../services/api";
import { handleNextPage, handlePrevPage, handleResetFormData, selectMultiFormState } from "../../redux/features/multiForm/multiFormSlice";
import { extendedApiSlice } from "../../redux/features/files/filesSlice";
import { FileType } from "../Home";

import { FormInputs } from "./components/FormInputs";
import { Button } from "../../Components";

import {
  UploadContainer,
  ButtonsContainer,
  CircularProgressBarContainer,
  CircularProgressBar,
  ProgressValue,
  UploadCompletedContainer,
  UploadFailedContainer,
} from './styles';

interface UploadedFile{
  progress: number;
  isUploaded: boolean;
  isError: boolean;
  id: string | null;
}

export function Upload(){
  const [uploadedFile, setUploadedFile] = useState({
    progress: 0,
    id: null,
    isError: false,
    isUploaded: false,
  } as UploadedFile);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { page, formData } = useSelector(selectMultiFormState);

  function handleInvalidateCacheData(){
    dispatch(extendedApiSlice.util.invalidateTags([{ type: 'File' as const, id: 'LIST' }]));
  }

  function handleSubmit(event: FormEvent){
    event.preventDefault();

    if(!formData.video || !formData.image){ return; }
    
    const data = new FormData(event.target as HTMLFormElement);

    data.append('file', formData.video);
    data.append('file', formData.image);
    data.append('title', formData.title);

    api.post('/uploads', data, {
      onUploadProgress: (e) =>{
        if(e.total){
          const progress = Math.round((e.loaded * 100) / e.total);
          setUploadedFile((prev) =>{
            return{
              ...prev,
              progress,
            }
          });
        }
      }
    }).then((result) => {
      setUploadedFile((prev) => ({
        ...prev,
        isUploaded: true,
        id: result.data._id,
      }));

      handleInvalidateCacheData();

      dispatch(handleResetFormData());
    }).catch((error) =>{
      setUploadedFile((prev) =>{
        return{
          ...prev,
          isError: true,
        }
      });
    })
  }

  const canSubmit = Object.values(formData).every(Boolean);

  const canNextPage = Object.values(formData).filter((key, i) => i === page).every(Boolean);

  const disablePrev = page === 0;

  const disableNext = 
    (page === Object.keys(formData).length - 1)
    || (page === 0 && !canNextPage)
    || (page === 1 && !canNextPage);

  const prevHide = page === 0 ? 'hide-button' : '';
  const nextHide = page === Object.keys(formData).length - 1 ? 'hide-button' : '';
  const submitHide = page !== Object.keys(formData).length - 1 ? 'hide-button' : '';

  return(
    <UploadContainer>  
      <form onSubmit={handleSubmit}>
        {!uploadedFile.progress && (
          <FormInputs />
        )}

        {uploadedFile.progress ? (
          <CircularProgressBarContainer>
            <CircularProgressBar progress={uploadedFile.progress}>
              <ProgressValue>{uploadedFile.progress}%</ProgressValue>
            </CircularProgressBar>

            {uploadedFile.isUploaded && (
              <UploadCompletedContainer>
                <CheckCircle />
                <span>File uploaded successfully.</span>
                <button type="button" onClick={() => navigate(`/video/${uploadedFile.id}`)}>
                  <LinkSimple />
                </button>
              </UploadCompletedContainer>
            )}

            {uploadedFile.isError && (
              <UploadFailedContainer>
                <XCircle />
                <span>The operation could not be completed. Please try again.</span>
                <button type="button" onClick={() => setUploadedFile({} as UploadedFile)}>
                  reset
                </button>
              </UploadFailedContainer>
            )}
          </CircularProgressBarContainer>
        ) : (
          <ButtonsContainer>
            <Button.Root 
              type="button" 
              disabled={disablePrev}
              onClick={() => dispatch(handlePrevPage())}
              className={prevHide}
            >
              <Button.Icon icon={<CaretLeft />} />
              <Button.Title>Prev</Button.Title>
            </Button.Root>
            <Button.Root 
              type="button" 
              disabled={disableNext}
              onClick={() => dispatch(handleNextPage())}
              className={nextHide}
            >
              <Button.Title>Next</Button.Title>
              <Button.Icon icon={<CaretRight />} />
            </Button.Root>
            <Button.Root 
              type="submit"
              disabled={!canSubmit}
              className={submitHide}
            >
              <Button.Title>Upload</Button.Title>
              <Button.Icon icon={<UploadSimple />} />
            </Button.Root>
          </ButtonsContainer>
        )}
      </form>
    </UploadContainer>
  );
}