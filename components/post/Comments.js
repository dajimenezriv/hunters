// logic
import PropTypes from 'prop-types';
import { postTypes } from 'utils/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postReducer from 'reducers/post';

// gui
import { FlatList, View } from 'react-native';
import colors from 'utils/colors';

// components
import Comment from './Comment';

export default function Comments({ post, showComments }) {
  if (!showComments) return null;

  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.post);

  const refresh = () => { dispatch(postReducer.getAllComments(post.id)); }

  useEffect(() => { refresh(); }, []);

  return (
    <View style={{
      flexDirection: 'column',
    }}
    >
      <View style={{
        width: '100%',
        height: 1,
        backgroundColor: colors.darkWhite,
        marginVertical: 20,
      }} />
      
      <FlatList
        style={{
          backgroundColor: 'white',
          height: '100%',
        }}
        data={comments}
        keyExtractor={(comment) => comment.id}
        renderItem={({ item }) => <Comment comment={item} />}
      />
    </View>
  )
}

Comments.propTypes = {
  post: postTypes,
  showComments: PropTypes.bool.isRequired,
};
