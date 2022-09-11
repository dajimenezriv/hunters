// logic
import PropTypes from 'prop-types';
import { postTypes } from 'utils/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as postReducer from 'reducers/post';

// gui
import { FlatList, View } from 'react-native';

// components
import Comment from './Comment';

export default function Comments({ style, post, showComments }) {
  if (!showComments) return null;

  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.post);

  const refresh = () => { dispatch(postReducer.getAllComments(post)); }

  useEffect(() => { refresh(); }, []);

  return (
    <FlatList
      style={{
        ...style,
        padding: 10,
        alignSelf: 'stretch',
        backgroundColor: 'white',
      }}
      data={comments}
      keyExtractor={(comment) => comment.id}
      renderItem={({ item }) => <Comment comment={item} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => (
        <View style={{
          height: 7,
        }} />
      )}
    />
  )
}

Comments.propTypes = {
  style: PropTypes.any,
  post: postTypes,
  showComments: PropTypes.bool.isRequired,
};
