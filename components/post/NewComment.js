// logic
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

// gui
import { TextInput } from 'react-native';

export default function NewComment({ showComments }) {
  const dispatch = useDispatch(); // eslint-disable-line
  const [newComment, setNewComment] = useState('');

  if (!showComments) return null;

  return (
    <TextInput
      onChangeText={(text) => setNewComment(text)}
      value={newComment}
      placeholder="Write comment"
      style={{
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'black',
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
      }}
    />
  );
}

NewComment.propTypes = {
  showComments: PropTypes.bool.isRequired,
};
