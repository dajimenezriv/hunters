import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import posts from './reducers/posts';
import user from './reducers/user';
import post from './reducers/post';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
}

const persistedPosts = persistReducer(persistConfig, posts)
const persistedUser = persistReducer(persistConfig, user)

const store = configureStore({
  reducer: {
    posts: persistedPosts,
    user: persistedUser,
    post,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
