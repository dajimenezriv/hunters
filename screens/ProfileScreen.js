// logic
import { useDispatch, useSelector } from 'react-redux';
import createDb from 'testing/mock_data';
import * as userReducer from 'reducers/user';

// gui
import { View, Button, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

// components
import Info from 'components/profile/Info';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  return (
    <View style={{
      padding: 10,
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'white',
      height: '100%',
    }}>
      <View style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        borderRadius: 10,
      }}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 10,
          }}
          source={{ uri: user.avatarUri }}
        />
      </View>

      <Text style={{
        fontWeight: 'bold',
        color: colors.darkGray,
        marginTop: 10,
      }}>{user.username}</Text>

      <View style={{
        width: '100%',
        padding: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Info text="Posts" value={user.numPosts} />
        <Info text="Followers" value={user.followers.length} />
        <Info text="Following" value={user.following.length} />
      </View>

      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Follow</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
      </View>

      <View style={{
        width: '100%',
      }}>
        <View style={{
          width: '100%',
          height: 1,
          backgroundColor: colors.darkWhite,
          marginVertical: 20,
        }} />

      </View>

      <Button title="Crear base de datos" onPress={() => createDb(dispatch)} />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 120,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal: 15,
  },
  buttonText: {
    color: colors.darkGray,
    fontWeight: 'bold',
  }
});
