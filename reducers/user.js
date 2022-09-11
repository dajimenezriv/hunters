// logic
import { createSlice } from '@reduxjs/toolkit';
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from 'config/firebase';

// gui
import { Alert } from 'react-native';

const defaultProfileUri = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/profile.png?alt=media&token=19b00937-cd8e-4d6d-9cf3-825fa51cf235'; // eslint-disable-line

const slice = createSlice({
  name: 'user',
  initialState: {
    refreshing: false,
    user: null,
    chats: [],
    messages: [],
    posts: [],
  },
  reducers: {
    setRefreshing(state, { payload }) {
      const refreshing = payload;
      return { ...state, refreshing };
    },
    setUser(state, { payload }) {
      const user = payload;
      return { ...state, user };
    },
    setChats(state, { payload }) {
      const chats = payload;
      return { ...state, chats };
    },
    setMessages(state, { payload }) {
      const messages = payload;
      return { ...state, messages };
    },
    setPosts(state, { payload }) {
      const posts = payload;
      return { ...state, posts };
    },
  },
});

export const { setRefreshing, setUser, setChats, setMessages, setPosts } = slice.actions;
export default slice.reducer;

export const signUp = (email, password, username) => async (dispatch) => {
  try {
    if (email !== '' && password !== '') {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userDetails = { username, avatarUri: defaultProfileUri };
      await usersService.add(user.uid, userDetails);
      dispatch(setUser({ id: user.uid, ...userDetails }));
    }
  } catch (err) {
    Alert.alert('userReducer.signUp', err.message);
  }
};

export const logIn = (email, password) => async (dispatch) => {
  try {
    if (email !== '' && password !== '') {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = await usersService.getById(res.user.uid);
      dispatch(setUser(user));
    }
  } catch (err) {
    Alert.alert('userReducer.logIn', err.message);
  }
};

export const signOut = () => async (dispatch) => {
  try {
    auth.signOut();
    dispatch(setUser(null));
  } catch (err) {
    Alert.alert('userReducer.signOut', err.message);
  }
}

export const getChats = () => async (dispatch, getState) => {
  setRefreshing(true);
  try {
    const { user: fromUser } = getState().user;
    const chats = await usersService.getChats(fromUser.id);
    dispatch(setChats(chats));
  } catch (err) {
    Alert.alert('userReducer.getChats', err.message);
  }
  setRefreshing(false);
};

export const getMessages = (toUserId) => async (dispatch, getState) => {
  dispatch(setRefreshing(true));
  try {
    const { user: fromUser } = getState().user;
    const messages = await usersService.getMessages(fromUser.id, toUserId);
    dispatch(setMessages(messages));
  } catch (err) {
    Alert.alert('userReducer.getMessages', err.message);
  }
  dispatch(setRefreshing(false));
};

export const sendMessage = (toUser, message) => async (dispatch, getState) => {
  try {
    // message is in the form [{message_content}]
    const { user: fromUser, messages } = getState().user;
    const { _id, createdAt, text } = message[0];
    const msg = {
      _id,
      createdAt: createdAt.toISOString(),
      text,
      user: { _id: fromUser.id, avatar: fromUser.avatarUri }
    }

    dispatch(setMessages(GiftedChat.append(messages, [msg])));    
    await usersService.sendMessage(fromUser.id, toUser, msg);
  } catch (err) {
    Alert.alert('userReducer.sendMessage', err.message);
  }
};

export const getPosts = () => async (dispatch, getState) => {
  setRefreshing(true);
  try {
    const { user } = getState().user;
    const posts = await postsService.getAll({ postsLimit: 1, userId: user.id });
    dispatch(setPosts(posts));
  } catch (err) {
    Alert.alert('userReducer.getPosts', err.message);
  }
  setRefreshing(false);
};
