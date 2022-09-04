// logic
import PropTypes from 'prop-types';
import { postTypes } from 'utils/types';

// gui
import { SafeAreaView } from 'react-native';

// components
import TextPost from 'components/post/TextPost';

export default function PostScreen({ route }) {
  const { post } = route.params;

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}
    >
      <TextPost post={post} showComments />
    </SafeAreaView>
  );
}

PostScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      post: postTypes,
    }).isRequired,
  }).isRequired,
}
