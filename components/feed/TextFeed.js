// logic
import PropTypes from 'prop-types';

// gui
import { View, Text, Image } from 'react-native';

// components
import Actions from './Actions';

export default function TextFeed({ item }) {
  let { description } = item;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={{
      padding: 10,
      flexDirection: 'row',
    }}>
      <Image source={{ uri: item.user.avatarUri }} style={{
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#dfdfdf',
      }} />
      <View>
        <Text style={{
          fontWeight: 'bold',
        }}>{item.user.username}</Text>

        <Text style={{
          marginRight: 55,
        }}>{description}</Text>

        <Actions item={item} />
      </View>
    </View>
  )
}

TextFeed.propTypes = {
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
