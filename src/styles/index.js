import { StyleSheet } from "react-native";

export const Color = {
  base: "#FFFA73"
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
    fontSize: 80
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: "center",
    backgroundColor: "#2196F3",
    borderRadius: 10
  },
  buttonText: {
    padding: 20,
    color: "black",
    fontSize: 20
  }
});
