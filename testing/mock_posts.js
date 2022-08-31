// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as postsReducer from 'reducers/posts';

const stagUrl = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag.png?alt=media&token=23177268-9207-4b09-b5b4-9aa39c2a3b84'; // eslint-disable-line
const stag2Url = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag2.jpg?alt=media&token=db7148e9-a842-4900-ad4e-dbca5db8e4a7'; // eslint-disable-line
const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

const createPosts = async (dispatch) => {
  const dajimenezriv = await usersService.getById(dajimenezrivId);
  const marta = await usersService.getById(martaId);
  const javier = await usersService.getById(javierId);

  await postsService.deleteAll();

  await postsService.add({
    user: {
      userId: dajimenezrivId,
      username: dajimenezriv.username,
      avatarUri: dajimenezriv.avatarUri,
    },
    description: 'Something.',
    imageUri: null,
    createdAt: new Date(),
    likes: [javierId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: martaId,
      username: marta.username,
      avatarUri: marta.avatarUri,
    },
    description: 'Second.',
    imageUri: stagUrl,
    createdAt: new Date(),
    likes: [martaId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: javierId,
      username: javier.username,
      avatarUri: javier.avatarUri,
    },
    // eslint-disable-next-line
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper tincidunt sapien, quis pulvinar risus faucibus ac. Integer tempus lorem a tellus lobortis pellentesque. Nullam leo massa, consequat ut elementum vel, varius vitae neque. Pellentesque at viverra purus. Aliquam at imperdiet diam. Fusce eu mi pharetra, vehicula eros vel, bibendum nisi. Sed facilisis mauris eget porta fringilla. Donec gravida suscipit quam sed tempus. Etiam eget risus eu lacus feugiat porta. In hac habitasse platea dictumst. Maecenas pellentesque eros vel eros pharetra, non dignissim felis bibendum.',
    imageUri: null,
    createdAt: new Date(),
    likes: [martaId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: martaId,
      username: marta.username,
      avatarUri: marta.avatarUri,
    },
    description: 'Second.',
    imageUri: stag2Url,
    createdAt: new Date(),
    likes: [javierId, dajimenezrivId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: martaId,
      username: marta.username,
      avatarUri: marta.avatarUri,
    },
    description: 'Second.',
    imageUri: null,
    createdAt: new Date(),
    likes: [javierId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: martaId,
      username: marta.username,
      avatarUri: marta.avatarUri,
    },
    description: 'Second.',
    imageUri: stag2Url,
    createdAt: new Date(),
    likes: [dajimenezrivId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: dajimenezrivId,
      username: dajimenezriv.username,
      avatarUri: dajimenezriv.avatarUri,
    },
    // eslint-disable-next-line
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper tincidunt sapien, quis pulvinar risus faucibus ac. Integer tempus lorem a tellus lobortis pellentesque. Nullam leo massa, consequat ut elementum vel, varius vitae neque. Pellentesque at viverra purus. Aliquam at imperdiet diam. Fusce eu mi pharetra, vehicula eros vel, bibendum nisi. Sed facilisis mauris eget porta fringilla. Donec gravida suscipit quam sed tempus. Etiam eget risus eu lacus feugiat porta. In hac habitasse platea dictumst. Maecenas pellentesque eros vel eros pharetra, non dignissim felis bibendum.',
    imageUri: stagUrl,
    createdAt: new Date(),
    likes: [martaId, javierId],
    comments: [],
  });

  await postsService.add({
    user: {
      userId: javierId,
      username: javier.username,
      avatarUri: javier.avatarUri,
    },
    description: 'Second.',
    imageUri: null,
    createdAt: new Date(),
    likes: [javierId, dajimenezrivId],
    comments: [],
  });

  dispatch(postsReducer.getAll());
}

export default createPosts;
