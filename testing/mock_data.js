import { createChats } from './mock_chats';
import { createPosts } from './mock_posts';
import { createComments } from './mock_comments';
import { createUsers } from './mock_users';

const postLimit = 20;

const createDb = async (dispatch) => {
  await createUsers(dispatch);
  await createPosts(dispatch, 1, postLimit);
  await createChats(dispatch);
  await createComments(dispatch, 0, postLimit);
}

export default createDb;
