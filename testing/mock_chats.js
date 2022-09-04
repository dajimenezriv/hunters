import * as userReducer from 'reducers/user';
import * as usersService from 'services/users';

const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

export const createChats = async (dispatch) => {
  const dajimenezriv = await usersService.getById(dajimenezrivId);
  const marta = await usersService.getById(martaId);
  const javier = await usersService.getById(javierId);

  await usersService.sendMessage(dajimenezrivId, marta, {
    _id: 1,
    text: 'Hello',
    createdAt: new Date().toISOString(),
    user: { _id: martaId, avatar: marta.avatarUri }
  });

  dispatch(userReducer.getChats());
}

export default createChats;
