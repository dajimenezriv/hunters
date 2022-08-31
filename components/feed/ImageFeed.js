// logic
import PropTypes from 'prop-types';

// gui
import { View, Text, Image } from 'react-native';

// components
import Actions from './Actions';

export default function ImageFeed({ post }) {
  let { description } = post;
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
        <Image source={{ uri: post.user.avatarUri }} style={{
          marginRight: 10,
          width: 40,
          height: 40,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#dfdfdf',
        }} />
        <Text style={{
          fontWeight: 'bold',
        }}>{post.user.username}</Text>
      </View>

      {/* IMAGE */}

      <Image source={{ uri: post.imageUri }} style={{
        flex: 1,
        width: 400,
        height: 500,
      }} />
      <View style={{
        padding: 10,
      }}>
        {/* CHANGEEEEEEEEEEEEEEEEEEEEE */}
        <View style={{
          flexDirection: 'row',
          width: '100%',
        }}>
          <Text style={{
            fontWeight: 'bold',
          }}>{post.user.username}</Text>
          <Text> {description}</Text>
        </View>

        <Actions post={post} />
      </View>
    </View>
  )
}

ImageFeed.propTypes = {
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
