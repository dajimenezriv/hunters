import * as usersService from 'services/users';
import * as helper from './helper';

export const createChats = async () => {
  const dajimenezriv = await usersService.getById(helper.dajimenezrivId);
  const marta = await usersService.getById(helper.martaId);
  const javier = await usersService.getById(helper.javierId);

  await usersService.sendMessage(dajimenezriv.id, marta, {
    _id: 1,
    text: 'Hello',
    createdAt: new Date().toISOString(),
    user: { _id: marta.id, avatar: marta.avatarUri }
  });
}

export default createChats;
