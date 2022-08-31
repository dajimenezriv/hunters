// logic
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import * as usersService from 'services/users';

// gui
import { View, Button } from 'react-native';

export default function UserScreen({ route, navigation }) {
  const { userId } = route.params;
  const [user, setUser] = useState(null);

  console.log(userId);

  useEffect(() => {
    setUser(null);
    const getUser = async () => { setUser(await usersService.getById(userId)); }
    getUser();
  }, [userId]);

  if (user === null) return null;

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Button title={`Message ${user.username}`} />
    </View>
  )
}

UserScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
