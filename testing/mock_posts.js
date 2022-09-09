// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as postsReducer from 'reducers/posts';
import * as helper from './helper';

const imagesUri = [
  // null, null,
  'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag.png?alt=media&token=23177268-9207-4b09-b5b4-9aa39c2a3b84',
  'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag2.jpg?alt=media&token=db7148e9-a842-4900-ad4e-dbca5db8e4a7',
]

const initialRegion = {
  latitude: 39.939998,
  longitude: -3.8168354,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const getRandomImageUri = () => imagesUri[helper.rand(imagesUri.length)];

export const createPosts = async (num) => {
  const dajimenezriv = await usersService.getById(helper.dajimenezrivId);
  const marta = await usersService.getById(helper.martaId);
  const javier = await usersService.getById(helper.javierId);

  const users = [
    { id: dajimenezriv.id, username: dajimenezriv.username, avatarUri: dajimenezriv.avatarUri },
    { id: marta.id, username: marta.username, avatarUri: marta.avatarUri },
    { id: javier.id, username: javier.username, avatarUri: javier.avatarUri },
  ];

  const promise = new Promise((resolve, reject) => {
    let counter = num;
    Array(num).fill().map(async () => {
      await postsService.add({
        user: helper.getRandomUser(users),
        location: helper.getRandomLocation(initialRegion),
        description: helper.getRandomText(helper.rand(100)),
        imageUri: getRandomImageUri(),
        createdAt: new Date().toISOString(),
        likes: helper.getRandomLikes(),
        numComments: 0,
      });

      counter -= 1;
      if (counter === 0) resolve();
    })
  });

  await promise;
};

export default createPosts;
