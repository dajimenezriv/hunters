// logic
import { collection, orderBy, query, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { database } from 'config/firebase';

// gui
import { Alert } from 'react-native';

export const getAll = async ({ postsLimit = null }) => {
  try {
    const res = [];
    let q;

    // query
    if (postsLimit) q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'), limit(postsLimit));
    else q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'));

    // retrieve docs
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => { res.push({ id: d.id, ...d.data() })});
    return res;
  } catch (err) {
    Alert.alert('postsService.getAll', err.message);
    return [];
  }
}

export const getById = async (postId) => {
  try {
    const docRef = doc(database, 'posts', postId);
    const snapshot = await getDoc(docRef);
    return { id: snapshot.id, ...snapshot.data() };
  } catch (err) {
    Alert.alert('postsService.getById', err.message);
    return null;
  }
}

export const getByLocation = async ({ postsLimit = null }) => {

};

export const add = async (post) => {
  try {
    addDoc(collection(database, 'posts'), post);
  } catch (err) {
    Alert.alert('postsService.add', err.message);
  }
}

export const like = async (postId, likes) => {
  try {
    const docRef = doc(database, 'posts', postId);
    await updateDoc(docRef, { likes });
  } catch (err) {
    Alert.alert('postsService.like', err.message);
  }
};

export const getAllComments = async (postId) => {
  try {
    const res = [];
    const q = query(collection(database, 'posts', postId, 'comments'));

    // retrieve docs
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data();
      res.push({ id: d.id, ...data, })
    });
    return res;
  } catch (err) {
    Alert.alert('postsService.getAllComments', err.message);
    return [];
  }
};

export const addComment = async (post, comment) => {
  try {
    // add comment into the comments collection
    addDoc(collection(database, 'posts', post.id, 'comments'), comment);

    // increment the number of comments
    const docRef = doc(database, 'posts', post.id);
    await updateDoc(docRef, { numComments: post.numComments + 1 });
  } catch (err) {
    Alert.alert('postsService.addComment', err.message);
  }
};

export const deleteAllComments = async (postId) => {
  try {
    const q = query(collection(database, 'posts', postId, 'comments'));
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => deleteDoc(d.ref));
  } catch (err) {
    Alert.alert('postsService.deleteAllComments', err.message);
  }
};

export const deleteAll = async () => {
  try {
    // delete all comments
    const q = query(collection(database, 'posts'));
    const snapshot = await getDocs(q);
    // const batch = writeBatch(batch);
    // snapshot.forEach((d) => batch.delete(d.ref));
    snapshot.forEach((d) => {
      deleteAllComments(d.id);
      deleteDoc(d.ref);
    });
    // await batch.commit();
  } catch (err) {
    Alert.alert('postsService.deleteAll', err.message);
  }
}
