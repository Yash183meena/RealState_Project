import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// we import persistReducer from the 'redux-persist' library. This library helps in persisting (or saving) the Redux state to storage, so even if the user refreshes the page or closes the app, the data will still be there when they come back.

//Then, we import storage from 'redux-persist/lib/storage'. This is where the Redux state will be stored, usually in the browser's local storage.

//Instead of fetching initial data from scratch every time the application loads, persisting the state allows the application to load much faster since it can restore the previous state directly from storage.