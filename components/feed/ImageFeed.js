// logic
import PropTypes from 'prop-types';

// gui
import { View, Text, Image } from 'react-native';

// components
import Actions from './Actions';

export default function ImageFeed({ item }) {
  let { description } = item;
  if (description.length > 53) description = `${description.substring(0, 50)}...`;

  return (
    <View style={{
      flexDirection: 'column',
    }}>
      {/* USER */}

      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={{ uri: item.user.avatarUri }} style={{
          marginRight: 10,
          width: 40,
          height: 40,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#dfdfdf',
        }} />
        <Text style={{
          fontWeight: 'bold',
        }}>{item.user.username}</Text>
      </View>

      {/* IMAGE */}

      <Image source={{ uri: item.imageUri }} style={{
        flex: 1,
        width: 400,
        height: 500,
      }} />
      <View style={{
        padding: 10,
      }}>
        <Text>{description}</Text>

        <Actions item={item} />
      </View>
    </View>
  )
}

ImageFeed.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.shape({
      avatarUri: PropTypes.string,
      username: PropTypes.string,
    }),
    imageUri: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line
  }).isRequired,
};
