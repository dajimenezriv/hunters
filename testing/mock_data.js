// logic
import * as postsReducer from 'reducers/posts';
import * as postsService from 'services/posts';
import * as userReducer from 'reducers/user';
import * as usersService from 'services/users';

// gui
import { Alert } from 'react-native';

import { createChats } from './mock_chats';
import { createPosts } from './mock_posts';
import { createComments, createReplies } from './mock_comments';
import { createUsers } from './mock_users';

const postsLimit = 20;

const createDb = async (dispatch) => {
  await usersService.deleteAll();
  await postsService.deleteAll();

  await createUsers(dispatch);
  await createPosts(1);
  await createChats();
  await createComments(15);
  await createReplies(5);

  dispatch(userReducer.getChats());
  dispatch(postsReducer.getAll({ postsLimit }));

  Alert.alert('Finished');
}

export default createDb;
