/*
 * E2E Testing with Detox
 * set ANDROID_SDK_ROOT=C:\Users\Windows\AppData\Local\Android\Sdk
 * 
 */

// logic
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from 'config/firebase';
import store from 'store';

// gui
import { View, ActivityIndicator } from 'react-native';

// components
import Tabs from './navigation/Tabs';
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  )

  return (
    <Provider store={store}>
      <NavigationContainer>
        {(user) ? (
          <Tabs />
        ) : (
          <Stack.Navigator defaultScreenOptions={LoginScreen} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}
