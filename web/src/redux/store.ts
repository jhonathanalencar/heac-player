import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from './api/apiSlice';
import { multiFormSlice } from './features/multiForm/multiFormSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    multiForm: multiFormSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;