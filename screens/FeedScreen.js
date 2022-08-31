// logic
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';

// gui
import { View, FlatList, SafeAreaView } from 'react-native';
import colors from 'utils/colors';

// components
import TextFeed from 'components/feed/TextFeed';
import ImageFeed from 'components/feed/ImageFeed';

export default function FeedScreen() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(postsReducer.getAll());
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        style={{
          backgroundColor: '#fff',
        }}
        data={posts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        ItemSeparatorComponent={() => (
          <View style={{
            backgroundColor: colors.darkWhite,
            marginHorizontal: 10,
            height: 1,
          }} />
        )}
        renderItem={({ item }) => {
          if (item.imageUri) return <ImageFeed post={item} />
          return <TextFeed post={item} />
        }}
      />
    </SafeAreaView>
  )
}
