import createChats from './mock_chats';
import createPosts from './mock_posts';

const createDb = async (dispatch) => {
  await createPosts(dispatch);
  await createChats(dispatch);
}

export default createDb;
