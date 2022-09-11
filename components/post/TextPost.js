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

function Content({ style, post, showComments }) {
  let { description } = post;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={{
      ...style,
      padding: 10,
      flexDirection: 'row',
    }}>
      <Avatar user={post.user} />

      <View style={{
        flexDirection: 'column',
        marginLeft: 10,
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
  );
}

export default function TextPost({ post, showComments }) {
  return (
    <View style={{
      flexDirection: 'column',
      height: '100%',
    }}>
      <Content
        style={{}}
        post={post}
        showComments={showComments}
      />

      {(showComments) ? (
        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: colors.darkWhite,
        }} />
      ) : null}

      <Comments
        style={{
          flex: 1,
        }}
        post={post}
        showComments={showComments}
      />

      <NewComment
        style={{}}
        showComments={showComments}
      />
    </View>
  )
}

Content.propTypes = {
  style: PropTypes.any,
  post: postTypes,
  showComments: PropTypes.bool.isRequired,
};

TextPost.propTypes = {
  post: postTypes,
  showComments: PropTypes.bool.isRequired,
};
