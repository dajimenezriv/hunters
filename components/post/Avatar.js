// logic
import { userTypes } from 'utils/types';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'config/firebase';

// gui
import { Image, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

export default function Avatar({ user }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => {
      if (auth.currentUser.uid === user.id) navigation.navigate('Profile');
      else navigation.navigate('User', { userId: user.id })
    }}>
      <Image source={{ uri: user.avatarUri }} style={{
        marginRight: 10,
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: colors.lightGray,
      }} />
    </TouchableOpacity>
  )
}

Avatar.propTypes = {
  user: userTypes,
};
