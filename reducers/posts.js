// logic
import { createSlice } from '@reduxjs/toolkit';
import * as postsService from 'services/posts';

// gui
import { Alert } from 'react-native';

const qLimit = 1;

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
    setPost(state, { payload }) {
      const { posts } = state;
      const newPost = payload;
      return {
        ...state,
        posts: posts.map((post) => (post.id === newPost.id) ? newPost : post),
      }
    }
  },
});

export const { setRefreshing, setPosts, setPost } = slice.actions;
export default slice.reducer;

export const getAll = () => async (dispatch) => {
  setRefreshing(true);
  try {
    const posts = await postsService.getAll({ qLimit });
    dispatch(setPosts(posts));
  } catch (err) {
    Alert.alert('postsReducer.getAll', err.message);
  }
  setRefreshing(false);
};

export const add = (post) => async (dispatch, getState) => {
  try {
    const { user } = getState().user;
    const newPost = {
      user: {
        userId: user.id,
        username: user.username,
        avatarUri: user.avatarUri,
      },
      ...post,
      createdAt: new Date(),
      likes: [],
      numComments: 0,
    }

    await postsService.add({ post: newPost });
    dispatch(getAll());
  } catch (err) {
    Alert.alert('postsReducer.add', err.message);
  }
};

export const like = (post) => async (dispatch, getState) => {
  try {
    const { user } = getState().user;
    let likes = [];
    const idx = post.likes.indexOf(user.id);

    if (idx === -1) {
      likes = [...post.likes, user.id];
      dispatch(setPost({ ...post, likes }));
      await postsService.like({ post, user });
    } else {
      likes = post.likes.filter((uid) => uid !== user.id);
      dispatch(setPost({ ...post, likes }));
      await postsService.removeLike({ post, user });
    }
  } catch (err) {
    Alert.alert('postsRecucer.like', err.message);
  }
}
