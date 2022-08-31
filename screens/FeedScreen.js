// logic
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';

// gui
import { View, FlatList, SafeAreaView, StyleSheet } from 'react-native';

// components
import TextFeed from 'components/TextFeed';
import ImageFeed from 'components/ImageFeed';

export default function FeedScreen() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsReducer.getAll());
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        style={styles.flatList}
        data={posts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => {
          if (item.image) return <ImageFeed item={item} />
          return <TextFeed item={item} />
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: '#fff',
  },
  separator: {
    backgroundColor: '#d9d9d9',
    marginHorizontal: 10,
    height: 1,
  }
});
