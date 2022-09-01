// logic
import { useDispatch } from 'react-redux';
import createDb from 'testing/mock_data';

// gui
import { View, Button } from 'react-native';

export default function ProfileScreen() {
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Crear base de datos" onPress={() => createDb(dispatch)} />
    </View>
  )
}
