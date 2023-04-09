import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 210,
    height: 84,
    position: "absolute",
    top: 100,
    left: 100,
  },
  signIn: {
    width: 230,
    height: 230,
    marginBottom: 50,
    marginTop: 150,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginTop: 10,
    width: "80%",
  },
  button: {
    margin: 10,
    borderRadius: 50,
  },

  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContent: {
    width: "80%",
    marginVertical: 20,
    padding: 20,
    backgroundColor: "#efefef",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    margin: 20,
    elevation: 6,
  },

  form: {
    flexDirection: "column",
    //alignItems: "stretch",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 100,
  },
  svgContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  begin: {
    marginTop: 150,
    alignItems: "center",
  },
  servoSkull: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  adadmin: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  pictContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0,
  },
  image: {
    width: 350,
    height: 350,

    resizeMode: "contain",
  },
  cameraConainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0,
  },
  camera: {
    width: 350,
    height: 500,
    resizeMode: "contain",
    marginTop: 150,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0,
  },
  photo: {
    width: 250,
    height: 300,
    resizeMode: "cover",
    margin: 20,
  },
});
