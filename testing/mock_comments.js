// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as postsReducer from 'reducers/posts';

const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

export const createComments = async (dispatch, num, postsLimit) => {
  const dajimenezriv = await usersService.getById(dajimenezrivId);
  const marta = await usersService.getById(martaId);
  const javier = await usersService.getById(javierId);

  const post = (await postsService.getAll({ postLimit: 1 }))[0];
  
  await postsService.addComment(post, {
    text: 'First comment',
    likes: [],
    createdAt: new Date().toISOString(),
    user: {
      id: dajimenezrivId,
      username: dajimenezriv.username,
      avatarUri: dajimenezriv.avatarUri,
    }
  });

  dispatch(postsReducer.getAll({ postsLimit }));
};

export default createComments;
