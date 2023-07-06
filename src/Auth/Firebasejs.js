import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = JSON.parse(process.env.REACT_APP_API_KEY);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    return {error: "Auth SignIn Error"}
  }
};
const signUp = async (name, email, password, imgUrl) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;
    await updateProfile(user, { displayName: name, photoURL: imgUrl });
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    return {error: "Auth SignUp Error"}
  }
};
const signOutFun = async () => {
  try {
    signOut(auth)
  } catch (error) {
    return {error: "Auth SignOut Error"}
  }
};

const updateProfileFun =  async (name, imgUrl) => {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.updateProfile({
        displayName: name,
        photoURL: imgUrl,
      });
    }
  } catch (error) {
    return {error: "Profile Update Error"}
  }
};

const handleImageUpload = async (file) => {
  try {
    const storageRef = ref(storage, 'images/' + file.name);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    return {error: "Image Upload Error"}
  }
};

export { auth, db, signIn, signUp, signOutFun, updateProfileFun, handleImageUpload };
