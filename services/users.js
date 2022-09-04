// logic
import { auth, database } from 'config/firebase';
import { getDoc, setDoc, doc, collection, query, getDocs, deleteDoc, addDoc, orderBy } from 'firebase/firestore';

// gui
import { Alert } from 'react-native';

export const getById = async (id) => {
  try {
    const docRef = doc(database, 'users', id);
    const snapshot = await getDoc(docRef);
    return { id: snapshot.id, ...snapshot.data() };
  } catch (err) {
    Alert.alert('usersService.getById', err.message);
    return null;
  }
}

export const add = async (id, user) => {
  try {
    await setDoc(doc(collection(database, 'users'), id), user);
  } catch (err) {
    Alert.alert('usersService.add', err.message);
  }
};

export const getChats = async (fromUserId) => {
  try {
    const res = [];
    const q = query(collection(database, 'users', fromUserId, 'chats'), orderBy('lastMessageAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => { res.push({ id: d.id, ...d.data() })});
    return res;
  } catch (err) {
    Alert.alert('usersService.getChats', err.message);
    return [];
  }
};

export const getMessages = async (fromUserId, toUserId) => {
  try {
    const res = [];
    const q = query(collection(database, 'users', fromUserId, 'chats', toUserId, 'messages'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => { res.push({ id: d.id, ...d.data() })});
    return res;
  } catch (err) {
    Alert.alert('usersService.getMessages', err.message);
    return [];
  }
};

export const sendMessage = async (fromUserId, toUser, message) => {
  try {
    // update chat info
    const docRef = doc(collection(database, 'users', fromUserId, 'chats'), toUser.id);
    const toUserObj = { username: toUser.username, avatarUri: toUser.avatarUri, lastMessageAt: new Date().toISOString() };
    await setDoc(docRef, toUserObj);

    // add message
    const collectionRef = collection(database, 'users', fromUserId, 'chats', toUser.id, 'messages');
    await addDoc(collectionRef, message);
  } catch (err) {
    Alert.alert('usersService.sendMessage', err.message);
  }
}

export const deleteAllMessages = async (toUserId) => {
  try {
    const fromUserId = auth.currentUser.uid;
    const q = query(collection(database, 'users', fromUserId, 'chats', toUserId, 'messages'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => deleteDoc(d.ref));
  } catch (err) {
    Alert.alert('usersService.deleteAllChats', err.message);
  }
};

export const deleteAllChats = async (fromUserId) => {
  try {
    const q = query(collection(database, 'users', fromUserId, 'chats'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => deleteAllMessages(d.id));
    snapshot.forEach((d) => deleteDoc(d.ref));
  } catch (err) {
    Alert.alert('usersService.deleteAllChats', err.message);
  }
}
