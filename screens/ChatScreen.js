// logic
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userReducer from 'reducers/user';
import { auth } from 'config/firebase';

// gui
import { GiftedChat } from 'react-native-gifted-chat';
import { View } from 'react-native';

export default function ChatScreen({ route }) {
  const dispatch = useDispatch();
  const { toUser } = route.params;
  const { refreshing, messages } = useSelector((state) => state.user);

  const refresh = () => {
    dispatch(userReducer.getMessages(toUser.id));
  };

  useEffect(() => { refresh(); }, [toUser]);

  const onSend = useCallback(async (message = []) => {
    dispatch(userReducer.sendMessage(toUser, message));
  }, []);

  if (refreshing) return <View style={{ flex: 1, backgroundColor: 'white' }} />;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <GiftedChat
        messages={messages}
        onSend={(msgs) => onSend(msgs)}
        user={{ _id: auth.currentUser.uid }}
      />
    </View>
  )
}

ChatScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      toUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        avatarUri: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
}
