// logic
import { commentTypes } from 'utils/types';
import { getDiff } from 'utils/calcs';

// gui
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from 'utils/colors';

// components
import Avatar from './Avatar';

export default function Comment({ comment }) {
  return (
    <View style={{
      flexDirection: 'row',
      marginBottom: 15,
    }}>
      {/* avatar */}

      <Avatar user={comment.user} />

      {/* info and like */}

      <View style={{
        flex: 1,
        marginLeft: 10,
        flexDirection: 'row',
      }}>
        <View style={{
          flex: 1,
          marginRight: 10,
          flexDirection: 'column',
        }}>
          {/* username and text */}

          <View style={{
            flexDirection: 'row',
          }}>
            <Text>
              <Text style={{
                fontWeight: 'bold',
              }}>{comment.user.username}</Text>
              {' '}
              {comment.text}
            </Text>
          </View>

          {/* date and number of likes */}

          <View style={{
            flexDirection: 'row',
            marginTop: 3,
          }}>
            <Text style={{
              fontSize: 10,
              color: colors.lightGray,
            }}>{getDiff(new Date(comment.createdAt), new Date())}</Text>

            {(comment.likes.length !== 0) ? (
              <Text style={{
                color: colors.lightGray,
                fontSize: 10,
                marginLeft: 30,
              }}>{comment.likes.length} likes</Text>
            ) : null}
          </View>
        </View>

        {/* like */}

        <TouchableOpacity style={{
          marginTop: 8,
          marginHorizontal: 10,
        }}>
          <Icon name="heart" size={13} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

Comment.propTypes = {
  comment: commentTypes,
};
