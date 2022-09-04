import PropTypes from 'prop-types';

export const postTypes = PropTypes.shape({
  user: userTypes,
  createdAt: PropTypes.string.isRequired,
  imageUri: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.string).isRequired,
}).isRequired;

export const commentTypes = PropTypes.shape({
  user: userTypes,
  text: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.number).isRequired,
}).isRequired;

export const userTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  avatarUri: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
}).isRequired;
