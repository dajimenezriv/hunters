// logic
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as userReducer from 'reducers/user';

// gui
import { View, Image, StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import colors from 'utils/colors';

// images
const wallpaper = require('assets/wallpaper.jpg');

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('mail1@mail.com');
  const [password, setPassword] = useState('123456');

  return (
    <View style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
      <Image source={wallpaper} style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        resizeMode: 'cover',
        opacity: 0.3,
      }} />

      <SafeAreaView style={{
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        opacity: 0.8,
      }}>
        <Text style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: 'black',
          alignSelf: 'center',
          marginBottom: 60,
        }}>Hunters</Text>

        <TextInput
          id="email"
          style={styles.input}
          placeholder="Enter mail"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          textContentType="password"
          autoCorrect={false}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity
          style={{
            backgroundColor: 'gray',
            height: 58,
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: colors.darkGray,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => dispatch(userReducer.logIn(email, password))}
        >
          <Text style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 18
          }}>Log In</Text>
        </TouchableOpacity>

        <View style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
          <Text style={{
            color: 'gray',
            fontWeight: '600',
            fontSize: 14
          }}>Don&apos;t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{
              color: 'black',
              fontWeight: '600',
              fontSize: 14
            }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    padding: 12,
  },
});