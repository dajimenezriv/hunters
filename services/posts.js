// logic
import {
  collection, orderBy, query, getDocs, doc, getDoc, addDoc, deleteDoc, updateDoc, limit, where, increment, arrayUnion, arrayRemove,
} from 'firebase/firestore';
import { database } from 'config/firebase';

// gui
import { Alert } from 'react-native';

/*
 * Posts
 * 
 */

export const getAll = async ({ qLimit = null, userId = null }) => {
  try {
    const res = [];
    let q;

    // query
    q = query(collection(database, 'posts'), orderBy('createdAt', 'desc'));
    if (qLimit) q = query(q, limit(qLimit));
    if (userId) q = query(q, where('user.id', '==', userId));

    // retrieve docs
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => { res.push({ id: d.id, ...d.data() }) });
    return res;
  } catch (err) {
    Alert.alert('postsService.getAll', err.message);
    return [];
  }
}

export const getById = async ({ postId }) => {
  try {
    const docRef = doc(database, 'posts', postId);
    const snapshot = await getDoc(docRef);
    return { id: snapshot.id, ...snapshot.data() };
  } catch (err) {
    Alert.alert('postsService.getById', err.message);
    return null;
  }
}

export const getByLocation = async ({ qLimit = null }) => {

};

export const add = async (post) => {
  try {
    addDoc(collection(database, 'posts'), post);
  } catch (err) {
    Alert.alert('postsService.add', err.message);
  }
}

export const like = async ({ post, user }) => {
  try {
    const docRef = doc(database, 'posts', post.id);
    await updateDoc(docRef, { likes: arrayUnion(user.id) });
  } catch (err) {
    Alert.alert('postsService.like', err.message);
  }
};

export const removeLike = async ({ post, user }) => {
  try {
    const docRef = doc(database, 'posts', post.id);
    await updateDoc(docRef, { likes: arrayRemove(user.id) });
  } catch (err) {
    Alert.alert('postsService.removeLike', err.message);
  }
};

export const deleteAll = async () => {
  try {
    // delete all comments
    const q = query(collection(database, 'posts'));
    const snapshot = await getDocs(q);
    // const batch = writeBatch(batch);
    // snapshot.forEach((d) => batch.delete(d.ref));
    snapshot.forEach((post) => {
      deleteAllComments({ post });
      deleteDoc(post.ref);
    });
    // await batch.commit();
  } catch (err) {
    Alert.alert('postsService.deleteAll', err.message);
  }
}

/*
 * Comments
 * 
 */

export const getAllComments = async ({ post, qLimit = null }) => {
  try {
    const res = [];
    let q;

    // query
    q = query(collection(database, 'posts', post.id, 'comments'), orderBy('createdAt', 'desc'));
    if (qLimit) q = query(q, limit(qLimit));

    // retrieve docs
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data();
      res.push({ id: d.id, ...data, });
    });
    return res;
  } catch (err) {
    Alert.alert('postsService.getAllComments', err.message);
    return [];
  }
};

export const addComment = async ({ post, comment }) => {
  try {
    // add comment into the comments collection
    addDoc(collection(database, 'posts', post.id, 'comments'), comment);

    // increment the number of comments
    const docRef = doc(database, 'posts', post.id);
    await updateDoc(docRef, { numComments: increment(1) });
  } catch (err) {
    Alert.alert('postsService.addComment', err.message);
  }
};

export const likeComment = async ({ post, comment, likes }) => {
  try {
    const docRef = doc(database, 'posts', post.id, 'comments', comment.id);
    await updateDoc(docRef, { likes });
  } catch (err) {
    Alert.alert('postsService.likeComment', err.message);
  }
};

export const deleteAllComments = async ({ post }) => {
  try {
    const q = query(collection(database, 'posts', post.id, 'comments'));
    const snapshot = await getDocs(q);
    snapshot.forEach((comment) => {
      deleteAllReplies({ post, comment });
      deleteDoc(comment.ref);
    });
  } catch (err) {
    Alert.alert('postsService.deleteAllComments', err.message);
  }
};

/*
 * Replies
 * 
 */

export const getAllReplies = async ({ post, comment, qLimit = null }) => {
  try {
    const res = [];
    let q;

    // query
    q = query(collection(database, 'posts', post.id, 'comments', comment.id, 'replies'), orderBy('createdAt', 'desc'))
    if (qLimit) q = query(q, limit(qLimit));

    // retrieve docs
    const snapshot = await getDocs(q);
    snapshot.forEach((d) => {
      const data = d.data();
      res.push({ id: d.id, ...data, })
    });
    return res;
  } catch (err) {
    Alert.alert('postsService.getAllReplies', err.message);
    return [];
  }
};

export const addReply = async ({ post, comment, reply }) => {
  try {
    // add reply into the replies collection
    addDoc(collection(database, 'posts', post.id, 'comments', comment.id, 'replies'), reply);

    // increment the number of replies
    const docRef = doc(database, 'posts', post.id, 'comments', comment.id);
    await updateDoc(docRef, { numReplies: increment(1) });
  } catch (err) {
    Alert.alert('postsService.addReply', err.message);
  }
};

export const likeReply = async ({ post, comment, reply, likes }) => {
  try {
    const docRef = doc(database, 'posts', post.id, 'comments', comment.id, 'replies', reply.id);
    await updateDoc(docRef, { likes });
  } catch (err) {
    Alert.alert('postsService.likeReply', err.message);
  }
};

export const deleteAllReplies = async ({ post, comment }) => {
  try {
    const q = query(collection(database, 'posts', post.id, 'comments', comment.id, 'replies'));
    const snapshot = await getDocs(q);
    snapshot.forEach((reply) => deleteDoc(reply.ref));
  } catch (err) {
    Alert.alert('postsService.deleteAllReplies', err.message);
  }
}
