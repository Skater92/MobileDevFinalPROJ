import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const signUpWithEmailAndPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      // Error occurred during sign up
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

export default signUpWithEmailAndPassword;
