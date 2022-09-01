// logic
import { createSlice } from '@reduxjs/toolkit';
import * as postsService from 'services/posts';

// gui
import { Alert } from 'react-native';

const slice = createSlice({
  name: 'posts',
  initialState: { refreshing: false, posts: [] },
  reducers: {
    setRefreshing(state, { payload }) {
      const refreshing = payload;
      return { ...state, refreshing };
    },
    setPosts(state, { payload }) {
      const posts = payload;
      return { ...state, posts };
    },
  },
});

export const { setRefreshing, setPosts, setPost } = slice.actions;
export default slice.reducer;

export const getAll = () => async (dispatch) => {
  setRefreshing(true);
  try {
    const res = await postsService.getAll();
    dispatch(setPosts(res));
  } catch (err) {
    Alert.alert('mapReducer.getAll', err.message);
  }
  setRefreshing(false);
};
