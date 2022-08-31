// logic
import { collection, orderBy, query, getDocs, doc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';
import { database } from 'config/firebase';

// gui
import { Alert } from 'react-native';

export const getAll = async () => {
  const res = [];
  const q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  snapshot.forEach((d) => {
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

export async function deleteAll() {
  try {
    const q = query(collection(database, 'posts'));
    const snapshot = await getDocs(q);
    // const batch = writeBatch(batch);
    // snapshot.forEach((d) => batch.delete(d.ref));
    snapshot.forEach((d) => deleteDoc(d.ref));
    // await batch.commit();
  } catch (err) {
    Alert.alert('deleteAll', err.message);
  }
}
