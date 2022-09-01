// logic
import * as usersService from 'services/users';
import * as postsService from 'services/posts';
import * as postsReducer from 'reducers/posts';

const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

const userIds = [dajimenezrivId, martaId, javierId];

const imagesUri = [
  null, null,
  'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag.png?alt=media&token=23177268-9207-4b09-b5b4-9aa39c2a3b84',
  'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/stag2.jpg?alt=media&token=db7148e9-a842-4900-ad4e-dbca5db8e4a7',
]

const initialRegion = {
  latitude: 39.939998,
  longitude: -3.8168354,
  latitudeDelta: 8.5,
  longitudeDelta: 8.5,
};

const rand = (max) => Math.floor(Math.random() * max);

const getRandomUser = (users) => users[rand(users.length)];
const getRandomImageUri = () => imagesUri[rand(imagesUri.length)];

const getRandomLocation = () => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
  return {
    latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
    longitude: longitude + (Math.random() - 0.5) * longitudeDelta
  }
}

const getRandomLikes = () => {
  const likes = [];
  Array(rand(userIds.length)).fill().forEach(() => {
    const userId = userIds[rand(userIds.length)];
    if (!likes.includes(userId)) likes.push(userId);
  })
  return likes;
};

const createPosts = async (dispatch, num) => {
  const dajimenezriv = await usersService.getById(dajimenezrivId);
  const marta = await usersService.getById(martaId);
  const javier = await usersService.getById(javierId);

  const users = [
    { userId: dajimenezrivId, username: dajimenezriv.username, avatarUri: dajimenezriv.avatarUri },
    { userId: martaId, username: marta.username, avatarUri: marta.avatarUri },
    { userId: javierId, username: javier.username, avatarUri: javier.avatarUri },
  ];

  await postsService.deleteAll();

  const promise = new Promise((resolve, reject) => {
    let counter = num;
    Array(num).fill().map(async () => {
      getRandomLikes();
      await postsService.add({
        user: getRandomUser(users),
        location: getRandomLocation(),
        description: 'Something.',
        imageUri: getRandomImageUri(),
        createdAt: new Date(),
        likes: getRandomLikes(),
        comments: [],
      });

      counter -= 1;
      if (counter === 0) resolve();
    })
  });

  await promise;

  dispatch(postsReducer.getAll());
};

export default createPosts;
