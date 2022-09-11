// logic
import { useState } from 'react';
import { commentTypes } from 'utils/types';

// gui
import { View, Text, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

export default function Replies({ comment }) {
  const [showReplies, setShowReplies] = useState(false);

  if (comment.numReplies === 0) return null;

  /* list of replies */

  if (showReplies) return (
    <TouchableOpacity
      onPress={() => setShowReplies(false)}
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{
        height: 1,
        width: 20,
        backgroundColor: colors.darkGray,
      }} />

      <Text style={{
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.darkGray,
      }}>{` Hide replies`}</Text>
    </TouchableOpacity>
  );

  /* show replies */

  return (
    <TouchableOpacity
      onPress={() => setShowReplies(true)}
      style={{
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{
        height: 1,
        width: 20,
        backgroundColor: colors.darkGray,
      }} />

      <Text style={{
        fontSize: 12,
        fontWeight: 'bold',
        color: colors.darkGray,
      }}>{` View ${comment.numReplies} more replies`}</Text>
    </TouchableOpacity>
  )
}

Replies.propTypes = {
  comment: commentTypes,
}