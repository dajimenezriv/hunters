// logic
import PropTypes from 'react';

// gui
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ImageFeed({ item }) {
  let { description } = item;
  if (description.length > 53) description = `${description.substring(0, 50)}...`;

  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.user.username}</Text>
      </View>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.descriptionContainer}>
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
    flexDirection: 'column',
  },
  userContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  image: {
    flex: 1,
    width: 400,
    height: 400,
  },
  descriptionContainer: {
    padding: 10,
  },
  description: {

  },
  actionsContainer: {
    marginTop: 5,
    flexDirection: 'row',
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

ImageFeed.propTypes = {
  item: PropTypes.any,
}
