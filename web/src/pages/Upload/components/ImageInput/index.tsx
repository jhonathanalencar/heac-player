import { useSelector, useDispatch } from 'react-redux';
import { FileImage } from "phosphor-react";

import { handleOnFormDataChange, selectMultiFormState } from '../../../../redux/features/multiForm/multiFormSlice';

import { FileInfo } from '../../../../Components';

export function ImageInput(){
  const { formData } = useSelector(selectMultiFormState);
  const dispatch = useDispatch();

  function handleOnChange(file: File){
    dispatch(handleOnFormDataChange({ key: 'image', value: file }));
  }

  return(
    <>
      <label htmlFor="image" className="file">
        <FileImage />
        <span>Select a thumbnail</span>
      </label>
      <input 
        id="image" 
        type="file" 
        accept="image/*"
        className="visually-hidden" 
        onChange={(event) => event.target.files && handleOnChange(event.target.files[0])} 
      />
      {formData.image && (
        <FileInfo file={formData.image} />
      )}
    </>
  )
}