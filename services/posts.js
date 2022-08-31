// logic
import { collection, orderBy, query, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { database } from 'config/firebase';

// gui
import { Alert } from 'react-native';

export const getAll = async () => {
  const res = [];
  const q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  await snapshot.forEach(async (d) => {
    const data = d.data();
    delete data.createdAt; // it's not serializble
    res.push({ id: d.id, ...data, })
  });
  return res;
}

export const getById = async (id) => {
  const docRef = doc(database, 'posts', id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() };
}

export const add = async (post) => addDoc(collection(database, 'posts'), post);

// not working
export const deleteAll = async () => {
  const q = query(collection(database, 'posts'));
  const snapshot = await getDocs(q);
  try {
    snapshot.forEach((d) => deleteDoc(d));
  } catch (err) {
    Alert.alert('Post error', err.message);
  }
};
