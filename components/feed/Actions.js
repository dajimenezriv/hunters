// logic
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';

// gui
import { View, Image, Text, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

// images
const likesImage = require('assets/likes.png');
const conversationImage = require('assets/conversation.png');

export default function Actions({ post }) {
  const dispatch = useDispatch();

  return (
    <View style={{
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    }}>

      {/* LIKES */}

      <TouchableOpacity
        onPress={() => dispatch(postsReducer.like(post))}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image style={{
          width: 25,
          height: 25,
          borderRadius: 100,
        }} source={likesImage} />

        <Text style={{
          color: colors.pink,
          fontWeight: 'bold',
          marginLeft: 5,
        }}>{post.likes.length} me gusta</Text>
      </TouchableOpacity>

      {/* REPLIES */}

      <TouchableOpacity
        onPress={() => null}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 30,
        }}>
        <Image style={{
          width: 25,
          height: 25,
          borderRadius: 100,
        }} source={conversationImage} />

        <Text style={{
          color: colors.darkGray,
          fontWeight: 'bold',
          marginLeft: 5,
          marginRight: 25,
        }}>{post.comments.length} comentarios</Text>
      </TouchableOpacity>
    </View>
  )
}

Actions.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      userId: PropTypes.string,
      avatarUri: PropTypes.string,
      username: PropTypes.string,
    }),
    imageUri: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line
  }).isRequired,
};
