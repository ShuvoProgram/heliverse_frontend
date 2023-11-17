import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/baseApi';

const store = configureStore({
    reducer: {
    //   auth: userReducer,
    //   books: booksSlice,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;