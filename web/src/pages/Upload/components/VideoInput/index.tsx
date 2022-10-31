import { useDispatch, useSelector } from 'react-redux';
import { FileArrowUp } from "phosphor-react";

import { handleOnFormDataChange, selectMultiFormState } from '../../../../redux/features/multiForm/multiFormSlice';

import { FileInfo } from "../../../../Components";

export function VideoInput(){
  const { formData } = useSelector(selectMultiFormState);
  const dispatch = useDispatch();

  function handleOnChange(file: File){
    dispatch(handleOnFormDataChange({ key: 'video', value: file }));
  }

  return(
    <>
      <label htmlFor="video" className="file">
        <FileArrowUp />
        <span>Select a video</span>
      </label>
      <input 
        id="video" 
        accept="video/*"
        type="file"
        className="visually-hidden" 
        onChange={(event) => event.target.files && handleOnChange(event.target.files[0])} 
      />
      {formData.video && (
        <FileInfo file={formData.video} />
      )}
    </>
  )
}