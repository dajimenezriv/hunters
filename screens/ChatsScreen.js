// logic
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userReducer from 'reducers/user';
import getDiff from 'utils/calcs';

// gui
import { FlatList, SafeAreaView, Text, Image, TouchableOpacity, RefreshControl, View } from 'react-native';
import colors from 'utils/colors';


export default function ChatsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { refreshing, chats } = useSelector((state) => state.user);

  const refresh = () => { dispatch(userReducer.getChats()); };

  useEffect(() => { refresh(); }, []);

  return (
    <SafeAreaView>
      <FlatList
        style={{
          backgroundColor: 'white',
          height: '100%',
        }}
        data={chats}
        keyExtractor={(chat) => chat.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Chat', { toUser: item })}
            style={{
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
            }}>
            <Image source={{ uri: item.avatarUri }} style={{
              marginRight: 10,
              width: 40,
              height: 40,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: '#dfdfdf',
            }} />
            <View style={{
              flexDirection: 'column'
            }}>
              <Text style={{
                fontWeight: 'bold',
              }}>{item.username}</Text>
              <Text style={{
                color: colors.lightGray,
              }}>{getDiff(new Date(item.lastMessageAt), new Date())} ago</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={<RefreshControl
          colors={["#9Bd35A", "#689F38"]}
          refreshing={refreshing}
          onRefresh={refresh}
        />}
      />
    </SafeAreaView>
  )
}

ChatsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
