// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as postsReducer from 'reducers/posts';

// eslint-disable-next-line
const stagUrl = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag.jpg?alt=media&token=a6900058-8ad9-4c6d-8105-b95dd5cab949';
const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

export const createPosts = async (dispatch) => {
  const dajimenezriv = await usersService.getById(dajimenezrivId);
  const marta = await usersService.getById(martaId);
  const javier = await usersService.getById(javierId);

  // await postsService.deleteAll(); // not working

  await postsService.add({
    userId: dajimenezrivId,
    user: {
      username: dajimenezriv.username,
      avatar: dajimenezriv.avatar,
    },
    description: 'Something.',
    image: null,
    createdAt: new Date(),
    likes: [javierId],
    comments: [],
  });

  await postsService.add({
    userId: martaId,
    user: {
      username: marta.username,
      avatar: marta.avatar,
    },
    description: 'Second.',
    image: stagUrl,
    createdAt: new Date(),
    likes: [martaId, dajimenezrivId],
    comments: [],
  });

  dispatch(postsReducer.getAll());
}

export const createDb = async (dispatch) => {
  await createPosts(dispatch);
}
