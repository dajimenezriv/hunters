// logic
import { collection, orderBy, query, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { database } from 'config/firebase';

// gui
import { Alert } from 'react-native';

export const getAll = async () => {
  try {
    const res = [];
    // remove limit
    const q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'), limit(20));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data();
      data.createdAt = data.createdAt.toDate().toISOString();
      res.push({ id: d.id, ...data, })
    });
    return res;
  } catch (err) {
    Alert.alert('postsService.getChats', err.message);
    return [];
  }
}

export const getById = async (id) => {
  try {
    const docRef = doc(database, 'posts', id);
    const snapshot = await getDoc(docRef);
    return { id: snapshot.id, ...snapshot.data() };
  } catch (err) {
    Alert.alert('postsService.getById', err.message);
    return null;
  }
}

export const getByLocation = async () => {

};

export const add = async (post) => {
  try {
    addDoc(collection(database, 'posts'), post);
  } catch (err) {
    Alert.alert('postsService.add', err.message);
  }
}

export const like = async (id, likes) => {
  try {
    const docRef = doc(database, 'posts', id);
    await updateDoc(docRef, { likes });
  } catch (err) {
    Alert.alert('postsService.like', err.message);
  }
};

export const deleteAll = async () => {
  try {
    const q = query(collection(database, 'posts'));
    const snapshot = await getDocs(q);
    // const batch = writeBatch(batch);
    // snapshot.forEach((d) => batch.delete(d.ref));
    snapshot.forEach((d) => deleteDoc(d.ref));
    // await batch.commit();
  } catch (err) {
    Alert.alert('postsService.deleteAll', err.message);
  }
}
