// logic
import { postTypes } from 'utils/types';
import { useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';
import { useNavigation } from '@react-navigation/native';

// gui
import { View, Image, Text, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

// images
const likesImage = require('assets/likes.png');
const conversationImage = require('assets/conversation.png');

export default function Actions({ post }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{
      marginTop: 8,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
      {/* Likes */}

      <TouchableOpacity
        onPress={() => dispatch(postsReducer.like(post))}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image style={{
          width: 25,
          height: 25,
          borderRadius: 100,
        }} source={likesImage} />

        <Text style={{
          color: colors.pink,
          fontWeight: 'bold',
          marginLeft: 5,
        }}>{post.likes.length} me gusta</Text>
      </TouchableOpacity>

      {/* Replies */}

      <TouchableOpacity
        onPress={() => navigation.navigate('Post', { post })}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 30,
        }}>
        <Image style={{
          width: 25,
          height: 25,
          borderRadius: 100,
        }} source={conversationImage} />

        <Text style={{
          color: colors.darkGray,
          fontWeight: 'bold',
          marginLeft: 5,
          marginRight: 25,
        }}>{post.numComments} comentarios</Text>
      </TouchableOpacity>
    </View>
  )
}

Actions.propTypes = {
  post: postTypes,
};
