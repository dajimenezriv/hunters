// logic
import PropTypes from 'prop-types';
import { userTypes } from 'utils/types';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';

// gui
import { Image, TouchableOpacity, View } from 'react-native';

export default function Avatar({ user, width = 40, height = 40 }) {
  const navigation = useNavigation();

  return (
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
      backgroundColor: 'white',
      width,
      height,
    }}>
      <TouchableOpacity onPress={() => {
        if (auth.currentUser.uid === user.id) navigation.navigate('Profile');
        else navigation.navigate('User', { userId: user.id })
      }}>
        <Image source={{ uri: user.avatarUri }} style={{
          width,
          height,
          borderRadius: 10,
        }} />
      </TouchableOpacity>
    </View>
  )
}

Avatar.propTypes = {
  user: userTypes,
  width: PropTypes.number,
  height: PropTypes.number,
};
