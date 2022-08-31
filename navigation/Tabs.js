// logic
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from 'config/firebase';

// gui
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from 'utils/colors';

// components
import ChatScreen from 'screens/ChatScreen';
import FeedScreen from 'screens/FeedScreen';
import NewPostScreen from 'screens/NewPostScreen';
import MapScreen from 'screens/MapScreen';
import ProfileScreen from 'screens/ProfileScreen';

const Tab = createBottomTabNavigator();

function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -30,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: '#e32f45',
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default function Tabs() {
  const onSignOut = async () => {
    auth.signOut().catch((err) => console.log(err));
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        }
      }}
    >
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('assets/chat.png')} resizeMode="contain" style={{
              width: 25,
              height: 25,
            }} />
            <Text style={{
              color: (focused) ? '#e32f45' : '#748c94',
              fontSize: 12,
            }}>Chat</Text>
          </View>
        ),
      }} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('assets/feed.png')} resizeMode="contain" style={{
              width: 25,
              height: 25,
            }} />
            <Text style={{
              color: (focused) ? '#e32f45' : '#748c94',
              fontSize: 12,
            }}>Feed</Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSignOut} style={{ marginRight: 10 }}>
            <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
      }} />
      <Tab.Screen name="Post" component={NewPostScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('assets/upload.png')} resizeMode="contain" style={{
              width: 45,
              height: 45,
            }} />
          </View>
        ),
        tabBarButton: (props) => (
          <CustomTabBarButton {...props} />
        )
      }}>

      </Tab.Screen>
      <Tab.Screen name="Map" component={MapScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('assets/map.png')} resizeMode="contain" style={{
              width: 25,
              height: 25,
            }} />
            <Text style={{
              color: (focused) ? '#e32f45' : '#748c94',
              fontSize: 12,
            }}>Map</Text>
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity onPress={onSignOut} style={{ marginRight: 10 }}>
            <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
          </TouchableOpacity>
        ),
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('assets/profile.png')} resizeMode="contain" style={{
              width: 25,
              height: 25,
            }} />
            <Text style={{
              color: (focused) ? '#e32f45' : '#748c94',
              fontSize: 12,
            }}>Profile</Text>
          </View>
        ),
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7f5df0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.9,
    shadowRadius: 3.5,
    elevation: 5,
  }
});
