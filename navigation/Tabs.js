// logic
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as usersService from 'services/users';

// gui
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from 'utils/colors';

// components
import ChatScreen from 'screens/ChatScreen';
import FeedScreen from 'screens/FeedScreen';
import NewPostScreen from 'screens/NewPostScreen';
import MapScreen from 'screens/MapScreen';
import ProfileScreen from 'screens/ProfileScreen';

// images
const chatImage = require('assets/chat.jpg');
const feedImage = require('assets/feed.png');
const uploadImage = require('assets/upload.png');
const mapImage = require('assets/map.png');
const profileImage = require('assets/profile.png');

const Tab = createBottomTabNavigator();

function tabBarIcon(image) {
  return (
    <View style={styles.imageContainer}>
      <Image source={image} resizeMode="contain" style={styles.image} />
    </View>
  );
}

function headerRight() {
  return (
    <TouchableOpacity onPress={() => usersService.signOut()} style={{ marginRight: 10 }}>
      <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
    </TouchableOpacity>
  )
}

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: 90,
          shadowColor: colors.darkGray,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.9,
          shadowRadius: 3.5,
          elevation: 5,
        }
      }}
    >
      <Tab.Screen name="Chat" component={ChatScreen} options={{
        tabBarIcon: () => tabBarIcon(chatImage),
        headerRight: () => headerRight(),
      }} />

      <Tab.Screen name="Feed" component={FeedScreen} options={{
        tabBarIcon: () => tabBarIcon(feedImage),
        headerRight: () => headerRight(),
      }} />

      <Tab.Screen name="NewPost" component={NewPostScreen} options={{
        tabBarIcon: () => tabBarIcon(uploadImage),
        headerRight: () => headerRight(),
      }} />

      <Tab.Screen name="Map" component={MapScreen} options={{
        tabBarIcon: () => tabBarIcon(mapImage),
        headerRight: () => headerRight(),
      }} />

      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: () => tabBarIcon(profileImage),
        headerRight: () => headerRight(),
      }} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 48,
    height: 48,
  }
});
