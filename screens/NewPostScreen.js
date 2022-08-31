// logic
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';

// gui
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';

export default function NewPostScreen({ navigation }) {
  const dispatch = useDispatch();
  const [post, setPost] = useState({
    description: 'Hola',
    imageUri: null,
  });

  return (
    <View style={styles.container}>
      <Text>NewPost</Text>

      <TextInput
        onChangeText={(text) => setPost({ ...post, description: text })}
        value={post.description}
        placeholder="Descripción"
        style={styles.description}
      />

      <Button title="Publish" onPress={() => dispatch(postsReducer.add(post))} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  description: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
});
