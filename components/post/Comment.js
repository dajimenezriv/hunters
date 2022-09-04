// logic
import { commentTypes } from 'utils/types';
import { getDiff } from 'utils/calcs';

// gui
import { View, Text } from 'react-native';
import colors from 'utils/colors';

// components
import Avatar from './Avatar';

export default function Comment({ comment }) {
  return (
    <View style={{
      padding: 5,
      flexDirection: 'row',
    }}>
      <Avatar user={comment.user} />

      <View style={{
        flexDirection: 'column',
      }}>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text style={{
            fontWeight: 'bold',
            marginRight: 5,
          }}>{comment.user.username}</Text>
          <Text>{comment.text}</Text>
        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 3,
        }}>
          <Text style={{
            color: colors.lightGray,
            fontSize: 10,
          }}>{getDiff(new Date(comment.createdAt), new Date())}</Text>

          {(comment.likes.length !== 0) ? (
            <Text style={{
              color: colors.lightGray,
            }}>{comment.likes.length} likes</Text>
          ) : null}
        </View>
      </View>
    </View>
  )
}

Comment.propTypes = {
  comment: commentTypes,
};
