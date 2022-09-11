// logic
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as postsReducer from 'reducers/posts';

// gui
import { View, FlatList, SafeAreaView, RefreshControl } from 'react-native';
import colors from 'utils/colors';

// components
import TextPost from 'components/post/TextPost';
import ImagePost from 'components/post/ImagePost';

export default function FeedScreen() {
  const dispatch = useDispatch();
  const { refreshing, posts } = useSelector((state) => state.posts);

  const refresh = () => { dispatch(postsReducer.getAll()); };

  useEffect(() => { refresh(); }, []);

  return (
    <SafeAreaView>
      <FlatList
        style={{
          backgroundColor: 'white',
          height: '100%',
        }}
        data={posts}
        keyExtractor={(post) => post.id}
        contentContainerStyle={{ paddingBottom: 70 }}
        ItemSeparatorComponent={() => (
          <View style={{
            backgroundColor: colors.darkWhite,
            marginHorizontal: 10,
            height: 1,
          }} />
        )}
        renderItem={({ item }) => {
          if (item.imageUri) return <ImagePost post={item} />
          return <TextPost post={item} showComments={false} />
        }}
        refreshControl={<RefreshControl
          colors={[colors.darkGray, colors.lightGray]}
          refreshing={refreshing}
          onRefresh={refresh}
        />}
      />
    </SafeAreaView>
  )
}
