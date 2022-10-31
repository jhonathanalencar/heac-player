import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../store';

export type FormDataType = {
  video: File | null;
  title: string;
  image: File | null;
}

const initialState = {
  page: 0,
  formData: {
    video: null,
    title: '',
    image: null,
  } as FormDataType,
}

export const multiFormSlice = createSlice({
  name: 'multiForm',
  initialState,
  reducers: {
    handleNextPage(state){
      state.page += 1;
    },
    handlePrevPage(state){
      state.page -= 1;
    },
    handleOnFormDataChange(state, action: PayloadAction<{key: string, value: File | string | boolean}>){    
      state.formData = {
        ...state.formData,
        [action.payload.key]: action.payload.value,
      };
    },
    handleResetFormData(state){
      state.formData = initialState.formData;
      state.page = 0;
    }
  },
});

export const {
  handleNextPage,
  handlePrevPage,
  handleOnFormDataChange,
  handleResetFormData,
} = multiFormSlice.actions;

export const selectMultiFormState = (state: RootState) => state.multiForm;