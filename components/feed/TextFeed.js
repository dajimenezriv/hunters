// logic
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';

// gui
import { View, Text, Image, TouchableOpacity } from 'react-native';

// components
import Actions from './Actions';

export default function TextFeed({ post }) {
  const navigation = useNavigation();

  let { description } = post;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={{
      padding: 10,
      flexDirection: 'row',
    }}>
      <TouchableOpacity onPress={() => {
        if (auth.currentUser.uid === post.userId) navigation.navigate('Profile');
        else navigation.navigate('User', { userId: post.userId })
      }}>
        <Image source={{ uri: post.user.avatarUri }} style={{
          marginRight: 10,
          width: 40,
          height: 40,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#dfdfdf',
        }} />
      </TouchableOpacity>
      <View>
        <Text style={{
          fontWeight: 'bold',
        }}>{post.user.username}</Text>

        <Text style={{
          marginRight: 55,
        }}>{description}</Text>

        <Actions post={post} />
      </View>
    </View>
  )
}

TextFeed.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      avatarUri: PropTypes.string,
      username: PropTypes.string,
    }),
    userId: PropTypes.string,
    imageUri: PropTypes.string,
    description: PropTypes.string,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(PropTypes.any), // eslint-disable-line
  }).isRequired,
};
