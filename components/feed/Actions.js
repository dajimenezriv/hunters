// logic
import PropTypes from 'prop-types';

// gui
import { View, Image, Text } from 'react-native';
import colors from 'utils/colors';

// images
const likesImage = require('assets/likes.png');
const conversationImage = require('assets/conversation.png');

export default function Actions({ item }) {
  return (
    <View style={{
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
    }}>

      {/* LIKES */}

      <Image style={{
        width: 25,
        height: 25,
        borderRadius: 100,
      }} source={likesImage} />

      <Text style={{
        color: colors.pink,
        fontWeight: 'bold',
        marginLeft: 3,
        marginRight: 25,
      }}>{item.likes.length}</Text>

      {/* REPLIES */}

      <Image style={{
        width: 25,
        height: 25,
        borderRadius: 100,
      }} source={conversationImage} />

      <Text style={{
        color: colors.darkGray,
        fontWeight: 'bold',
        marginLeft: 3,
        marginRight: 25,
      }}>{item.comments.length}</Text>
    </View>
  )
}

Actions.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.shape({
      avatarUri: PropTypes.string,
      username: PropTypes.string,
    }),
    description: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line
  }).isRequired,
};
