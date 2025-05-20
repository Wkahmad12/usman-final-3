// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail  // Add the sendPasswordResetEmail import
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc 
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb6Ob1bSP9njUIjbj9muy2qU1mnmaYzU8",
  authDomain: "movie-hub-f71c3.firebaseapp.com",
  projectId: "movie-hub-f71c3",
  storageBucket: "movie-hub-f71c3.appspot.com",
  messagingSenderId: "853544359924",
  appId: "1:853544359924:web:00e66cb48889f04d53cba1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign-up function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Save user details in Firestore
    await addDoc(collection(db, "users"), {  
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });

    console.log("User signed up:", user);
  } catch (error) {
    console.error("Signup Error:", error);
    alert(error.message);
  }
};

// Login function
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in successfully!");
  } catch (error) {
    console.error("Login Error:", error);
    alert(error.message);
  }
};

// Logout function
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Logout Error:", error);
    alert(error.message);
  }
};

// Send Password Reset Email function
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
  } catch (error) {
    console.error("Password Reset Error:", error);
    alert(error.message);
  }
};

// Export functions
export { auth, db, login, signup, logout, sendPasswordReset };
