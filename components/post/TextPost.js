// logic
import PropTypes from 'prop-types';
import { postTypes } from 'utils/types';
import { getDiff } from 'utils/calcs';

// gui
import { View, Text } from 'react-native';
import colors from 'utils/colors';

// components
import Actions from './Actions';
import Comments from './Comments';
import NewComment from './NewComment';
import Avatar from './Avatar';

export default function TextPost({ post, showComments }) {
  let { description } = post;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={{
      padding: 10,
      flexDirection: 'column',
    }}>
      <View style={{
        flexDirection: 'row',
      }}>
        <Avatar user={post.user} />

        <View style={{
          flexDirection: 'column',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <Text style={{
              fontWeight: 'bold',
            }}>{post.user.username}</Text>

            <Text style={{
              marginLeft: 20,
              color: colors.lightGray,
              fontSize: 10,
            }}>{getDiff(new Date(post.createdAt), new Date())}</Text>
          </View>

          <Text style={{
            marginRight: 55,
          }}>{description}</Text>

          {(showComments) ? null : <Actions post={post} />}
        </View>
      </View>

      <Comments post={post} showComments={showComments} />

      <NewComment showComments={showComments} />
    </View>
  )
}

TextPost.propTypes = {
  post: postTypes,
  showComments: PropTypes.bool.isRequired,
};
