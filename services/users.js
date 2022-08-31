import { auth, database } from 'config/firebase';
import { getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const getById = async (id) => {
  const docRef = doc(database, 'userDetails', id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
}

export const signup = async (email, password, newUser) => {
  if (email !== '' && password !== '') {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(collection(database, 'userDetails'), user.uid), newUser)
    } catch (err) {
      console.log(err.message);
    }
  }
};
