
import { Alert } from "react-native";
import { getAuth } from "../FirebaseConfig";

const signIn = (email, password) => {
  const auth = getAuth();
  auth
    .signInWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      Alert.alert("Signed In");
      setLoggedIn(true);
    })
    .catch(function (error) {
      Alert.alert("Error Signing In");
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        Alert.alert("Wrong Password");
      } else {
        Alert.alert(errorMessage);
      }
      console.log(error);
    });
};
export default signIn;
