import createPosts from './mock_posts';

const createDb = async (dispatch) => {
  await createPosts(dispatch);
}

export default createDb;
