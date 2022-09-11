// gui
import { Text, View } from 'react-native';
import colors from 'utils/colors';

export default function Info({ text, value }) {
  return (
    <View style={{
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 18,
        color: colors.darkGray,
      }}>{value}</Text>
      <Text style={{
        color: colors.lightGray,
        fontSize: 12,
        fontWeight: 'bold',
      }}>{text}</Text>
    </View>
  )
}