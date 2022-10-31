import { useDispatch, useSelector } from 'react-redux';

import { handleOnFormDataChange, selectMultiFormState } from '../../../../redux/features/multiForm/multiFormSlice';

import { TitleContainer } from './styles';

export function TitleInput(){
  const { formData } = useSelector(selectMultiFormState);
  const dispatch = useDispatch();

  function handleOnChange(text: string){
    dispatch(handleOnFormDataChange({ key: 'title', value: text }));
  }
  return(
    <TitleContainer>
      <label htmlFor="title">Title</label>
      <input 
        type="text" 
        id="title" 
        name="title" 
        value={formData.title}
        onChange={(event) => handleOnChange(event.target.value)}
      />
    </TitleContainer>
  )
}