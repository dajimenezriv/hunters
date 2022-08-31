// logic
import { auth, database } from 'config/firebase';
import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// gui
import { Alert } from 'react-native';

// eslint-disable-next-line
const defaultProfileUri = 'https://firebasestorage.googleapis.com/v0/b/hunters-66bec.appspot.com/o/profile.png?alt=media&token=19b00937-cd8e-4d6d-9cf3-825fa51cf235';

export const getById = async (id) => {
  const docRef = doc(database, 'userDetails', id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
}

export const signUp = async (email, password, username) => {
  if (email !== '' && password !== '') {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(collection(database, 'userDetails'), user.uid), { username, avatar: defaultProfileUri })
    } catch (err) {
      Alert.alert('Signup error', err.message);
    }
  }
};

export const logIn = async (email, password) => {
  if (email !== '' && password !== '') {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      Alert.alert('Login error', err.message);
    }
  }
};

export const signOut = async () => {
  try {
    auth.signOut();
  } catch (err) {
    Alert.alert('Signout error', err.message);
  }
}
