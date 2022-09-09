export const dajimenezrivId = 'PUgoiV6Mb1POIZPAhRFkcitqdsQ2';
export const martaId = 'Etwhd7KsaDR3ZFdBe924Vnt3DqB3';
export const javierId = 'UNIg9zbqb9VBTjXB1oIMjrfKUCi1';

export const userIds = [dajimenezrivId, martaId, javierId];

export const rand = (max) => Math.floor(Math.random() * max);

export const getRandomUser = (users) => users[rand(users.length)];

export const getRandomText = (length) => {
  let result = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) result += chars.charAt(rand(chars.length));
  return result;
};

export const getRandomLocation = (initialRegion) => {
  const { latitude, longitude, latitudeDelta, longitudeDelta } = initialRegion;
  return {
    latitude: latitude + (Math.random() - 0.5) * latitudeDelta,
    longitude: longitude + (Math.random() - 0.5) * longitudeDelta
  }
}

export const getRandomLikes = () => {
  const likes = [];
  Array(rand(userIds.length)).fill().forEach(() => {
    const userId = userIds[rand(userIds.length)];
    if (!likes.includes(userId)) likes.push(userId);
  })
  return likes;
};
