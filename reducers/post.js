// logic
import { createSlice } from '@reduxjs/toolkit';
import * as postsService from 'services/posts';
import * as usersService from 'services/users';
import { auth } from 'config/firebase';

// gui
import { Alert } from 'react-native';

const slice = createSlice({
  name: 'post',
  initialState: { refreshing: false, comments: [] },
  reducers: {
    setRefreshing(state, { payload }) {
      const refreshing = payload;
      return { ...state, refreshing };
    },
    setComments(state, { payload }) {
      const comments = payload;
      return { ...state, comments };
    },
    setComment(state, { payload }) {
      const { comments } = state;
      const newComment = payload;
      return {
        ...state,
        posts: comments.map((post) => (post.id === newComment.id) ? newComment : post),
      }
    }
  },
});

export const { setRefreshing, setComments, setComment } = slice.actions;
export default slice.reducer;

export const getAllComments = (postId) => async (dispatch) => {
  setRefreshing(true);
  try {
    const comments = await postsService.getAllComments(postId);
    dispatch(setComments(comments));
  } catch (err) {
    Alert.alert('postReducer.getAllComments', err.message);
  }
  setRefreshing(false);
};

export const add = (post) => async (dispatch) => {
  try {
    const user = await usersService.getById(auth.currentUser.uid);
    const newPost = {
      ...post,
      createdAt: new Date(),
      user: {
        userId: user.id,
        username: user.username,
        avatarUri: user.avatarUri,
      },
      likes: [],
      comments: [],
    }

    await postsService.add(newPost);
    dispatch(getAllComments());
  } catch (err) {
    Alert.alert('postsReducer.add', err.message);
  }
};

export const likeComment = (post) => async (dispatch) => {
  try {
    let likes = [];
    const userId = auth.currentUser.uid;
    const idx = post.likes.indexOf(userId);

    if (idx === -1) likes = [...post.likes, userId];
    else likes = post.likes.filter((uid) => uid !== userId);

    dispatch(setComment({ ...post, likes }));
    await postsService.like(post.id, likes);
  } catch (err) {
    Alert.alert('postRecucer.likeComment', err.message);
  }
}
