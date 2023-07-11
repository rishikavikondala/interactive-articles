import { firestore } from "../utils/firebaseConfig";
import { collection, getDocs, getDoc, updateDoc, addDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { Article } from '../utils/types';

const articleCollectionName = "articles";
const articleIdsCollectionName = "articleIds";
const defaultArticleName = "Untitled Article";

export const getArticleIds = async () => {
  const articleIdsSnapshot = await getDocs(collection(firestore, articleIdsCollectionName));
  return articleIdsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name as string }));
};

export const createArticle = async () => {
  const newArticle = {
    name: defaultArticleName,
    createdAt: new Date(),
    Block: []
  };
  const docRef = await addDoc(collection(firestore, articleCollectionName), newArticle);
  await setDoc(doc(firestore, articleIdsCollectionName, docRef.id), {
    name: newArticle.name
  });
  return docRef.id;
};

export const getArticle = async (articleId: string): Promise<Article | null> => {
  const docRef = doc(firestore, articleCollectionName, articleId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as Article;
  } else {
    return null;
  }
};

export const updateArticle = async (articleId: string, article: Article) => {
  const articleRef = doc(firestore, articleCollectionName, articleId);
  await updateDoc(articleRef, {
    Block: article.Block,
    name: article.name,
  });

  const articleIdRef = doc(firestore, articleIdsCollectionName, articleId);
  await updateDoc(articleIdRef, {
    name: article.name,
  });
};


export const deleteArticle = async (id: string) => {
  await deleteDoc(doc(firestore, articleCollectionName, id));
  await deleteDoc(doc(firestore, articleIdsCollectionName, id));
};
