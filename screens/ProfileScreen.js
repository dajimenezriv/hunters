// logic
import { useDispatch } from 'react-redux';
import * as testing from 'testing/mock_data';

// gui
import { View, Button } from 'react-native';

export default function ProfileScreen({ nagivation }) {
  const dispatch = useDispatch();

  return (
    <View>
      <Button title="Crear base de datos" onPress={() => testing.createDb(dispatch)} />
    </View>
  )
}
