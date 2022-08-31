// logic
import { createSlice } from '@reduxjs/toolkit';
import * as postsService from 'services/posts';
import * as usersService from 'services/users';
import { auth } from 'config/firebase';

// gui
import { Alert } from 'react-native';

const slice = createSlice({
  name: 'posts',
  initialState: { posts: [] },
  reducers: {
    setPosts(state, { payload }) {
      const posts = payload;
      return { ...state, posts };
    },
  },
});

export const { setPosts } = slice.actions;
export default slice.reducer;

export const getAll = () => async (dispatch) => {
  try {
    const res = await postsService.getAll();
    dispatch(setPosts(res));
  } catch (err) {
    Alert.alert('postsReducer.getAll', err.message);
  }
};

export const add = (post) => async (dispatch) => {
  try {
    const user = await usersService.getById(auth.currentUser.uid);
    const newPost = {
      ...post,
      createdAt: new Date(),
      userId: user.id,
      user: {
        username: user.username,
        avatarUri: user.avatarUri,
      },
      likes: [],
      comments: [],
    }
    await postsService.add(newPost);
    dispatch(getAll());
  } catch (err) {
    Alert.alert('postsReducer.add', err.message);
  }
};
