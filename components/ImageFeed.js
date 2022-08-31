// logic
import PropTypes from 'react';

// gui
import { View, Text, Image } from 'react-native';
import colors from 'utils/colors';

// images
const likesImage = require('assets/likes.png');
const conversationImage = require('assets/conversation.png');

export default function ImageFeed({ item }) {
  let { description } = item;
  if (description.length > 53) description = `${description.substring(0, 50)}...`;

  return (
    <View style={{
      flexDirection: 'column',
    }}>
      {/* USER */}

      <View style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image source={{ uri: item.user.avatar }} style={{
          marginRight: 10,
          width: 40,
          height: 40,
          borderRadius: 10,
          borderWidth: 0.5,
          borderColor: '#dfdfdf',
        }} />
        <Text style={{
          fontWeight: 'bold',
        }}>{item.user.username}</Text>
      </View>

      {/* IMAGE */}

      <Image source={{ uri: item.image }} style={{
        flex: 1,
        width: 400,
        height: 500,
      }} />
      <View style={{
        padding: 10,
      }}>
        <Text>{description}</Text>

        <View style={{
          marginTop: 5,
          flexDirection: 'row',
        }}>

          {/* LIKES */}

          <Image style={{
            width: 25,
            height: 25,
            borderRadius: 100,
          }} source={likesImage} />

          <Text style={{
            color: colors.pink,
            fontWeight: 'bold',
            marginLeft: 3,
            marginRight: 25,
          }}>{item.likes.length}</Text>

          {/* REPLIES */}

          <Image style={{
            width: 25,
            height: 25,
            borderRadius: 100,
          }} source={conversationImage} />

          <Text style={{
            color: colors.darkGray,
            fontWeight: 'bold',
            marginLeft: 3,
            marginRight: 25,
          }}>{item.comments.length}</Text>
        </View>
      </View>
    </View>
  )
}

ImageFeed.propTypes = {
  item: PropTypes.any,
}
