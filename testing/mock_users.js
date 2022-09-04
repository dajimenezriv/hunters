import * as userReducer from 'reducers/user';
import * as usersService from 'services/users';

const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

const dajimenezriv = {
  username: 'dajimenezriv',
  avatarUri: 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/dajimenezriv.jpg?alt=media&token=f3e12646-7785-4deb-8d8b-1083866e7d1b', // eslint-disable-line
  followers: [],
  following: [],
  numPosts: 0,
};

const marta = {
  username: 'marta',
  avatarUri: 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/marta.jpg?alt=media&token=cc37a5b3-993e-4c97-b89e-5e5ee15c4c10', // eslint-disable-line
  followers: [],
  following: [],
  numPosts: 0,
};

const javier = {
  username: 'javier',
  avatarUri: 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/javier.png?alt=media&token=fc3bf69c-349f-4935-9541-9f7cd7823f20', // eslint-disable-line
  followers: [],
  following: [],
  numPosts: 0,
};

export const createUsers = async (dispatch) => {
  await usersService.deleteAll();

  await usersService.add(dajimenezrivId, dajimenezriv);
  await usersService.add(martaId, marta);
  await usersService.add(javierId, javier);

  dispatch(userReducer.setUser({ id: dajimenezrivId, ...dajimenezriv }))
};

export default createUsers;
