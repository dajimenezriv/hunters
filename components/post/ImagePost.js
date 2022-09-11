// logic
import { postTypes } from 'utils/types';
import { getDiff } from 'utils/calcs';

// gui
import { View, Text, Image } from 'react-native';
import colors from 'utils/colors';

// components
import Avatar from './Avatar';
import Actions from './Actions';

export default function ImagePost({ post }) {
  let { description } = post;
  if (description.length > 53) description = `${description.substring(0, 50)}...`;

  return (
    <View style={{ flexDirection: 'column' }}>
      {/* Header */}

      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Avatar user={post.user} />

        <Text style={{
          marginLeft: 10,
          fontWeight: 'bold',
        }}>{post.user.username}</Text>

        <Text style={{
          color: colors.lightGray,
          fontSize: 11,
          marginLeft: 15,
        }}>{getDiff(new Date(post.createdAt), new Date())}</Text>
      </View>

      {/* Image */}

      <Image
        source={{ uri: post.imageUri }}
        style={{
          width: 400,
          height: 500,
        }} />

      {/* Description */}

      <View style={{
        padding: 10,
      }}>
        {/* CHANGEEEEEEEEEEEEEEEEEEEEE, text goes outside */}
        <View style={{
          flexDirection: 'row',
          width: '100%',
        }}>
          <Text>
            <Text style={{
              fontWeight: 'bold',
            }}>{post.user.username}</Text>
            {' '}
            {description}
          </Text>
        </View>

        <Actions post={post} />
      </View>
    </View >
  )
}

ImagePost.propTypes = {
  post: postTypes,
};
