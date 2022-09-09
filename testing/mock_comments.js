// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as helper from './helper';

export const createComments = async (num) => {
  const dajimenezriv = await usersService.getById(helper.dajimenezrivId);
  const marta = await usersService.getById(helper.martaId);
  const javier = await usersService.getById(helper.javierId);

  const users = [
    { id: dajimenezriv.id, username: dajimenezriv.username, avatarUri: dajimenezriv.avatarUri },
    { id: marta.id, username: marta.username, avatarUri: marta.avatarUri },
    { id: javier.id, username: javier.username, avatarUri: javier.avatarUri },
  ];

  const post = (await postsService.getAll({ qLimit: 1 }))[0];

  const promise = new Promise((resolve, reject) => {
    let counter = num;
    Array(num).fill().map(async () => {
      await postsService.addComment({
        post,
        comment: {
          user: helper.getRandomUser(users),
          text: helper.getRandomText(helper.rand(100)),
          likes: helper.getRandomLikes(),
          createdAt: new Date().toISOString(),
          numReplies: 0,
        },
      });

      counter -= 1;
      if (counter === 0) resolve();
    })
  });

  await promise;
};

export const createReplies = async (num) => {
  const dajimenezriv = await usersService.getById(helper.dajimenezrivId);
  const marta = await usersService.getById(helper.martaId);
  const javier = await usersService.getById(helper.javierId);

  const users = [
    { id: dajimenezriv.id, username: dajimenezriv.username, avatarUri: dajimenezriv.avatarUri },
    { id: marta.id, username: marta.username, avatarUri: marta.avatarUri },
    { id: javier.id, username: javier.username, avatarUri: javier.avatarUri },
  ];

  const post = (await postsService.getAll({ qLimit: 1 }))[0];
  const comment = (await postsService.getAllComments({ post, qLimit: 1 }))[0];

  const promise = new Promise((resolve, reject) => {
    let counter = num;
    Array(num).fill().map(async () => {
      await postsService.addReply({
        post,
        comment,
        reply: {
          user: helper.getRandomUser(users),
          text: helper.getRandomText(helper.rand(100)),
          likes: helper.getRandomLikes(),
          createdAt: new Date().toISOString(),
        },
      });

      counter -= 1;
      if (counter === 0) resolve();
    })
  });

  await promise;
};
