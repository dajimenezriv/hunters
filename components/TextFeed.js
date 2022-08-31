// logic
import PropTypes from 'react';

// gui
import { View, Text, Image } from 'react-native';
import colors from 'utils/colors';

// images
const likesImage = require('assets/likes.png');
const conversationImage = require('assets/conversation.png');

export default function TextFeed({ item }) {
  let { description } = item;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={{
      padding: 10,
      flexDirection: 'row',
    }}>
      {/* AVATAR */}

      <Image source={{ uri: item.user.avatar }} style={{
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#dfdfdf',
      }} />
      <View>
        <Text style={{
          fontWeight: 'bold',
        }}>{item.user.username}</Text>

        <Text style={{
          marginRight: 55,
        }}>{description}</Text>

        <View style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
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

TextFeed.propTypes = {
  item: PropTypes.any,
}
