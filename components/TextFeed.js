// logic
import PropTypes from 'react';

// gui
import { View, Text, Image, StyleSheet } from 'react-native';

export default function TextFeed({ item }) {
  let { description } = item;
  if (description.length > 258) description = `${description.substring(0, 255)}...`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
      <View>
        <Text style={styles.username}>{item.user.username}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.actionsContainer}>
          <Image style={styles.imageActions} source={require('assets/likes.png')} />
          <Text style={styles.likesText}>{item.likes.length}</Text>
          <Image style={styles.imageActions} source={require('assets/conversation.png')} />
          <Text style={styles.likesText}>{item.comments.length}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#dfdfdf',
  },
  username: {
    fontWeight: 'bold',
  },
  description: {
    marginRight: 55,
  },
  actionsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageActions: {
    width: 25,
    height: 25,
    borderRadius: 100,
  },
  likesText: {
    color: '#e65a5a',
    fontWeight: 'bold',
    marginLeft: 3,
    marginRight: 25,
  }
})

TextFeed.propTypes = {
  item: PropTypes.any,
}
