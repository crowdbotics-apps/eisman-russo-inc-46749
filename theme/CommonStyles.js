import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
export const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },

  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  spaceBetweenH: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  modalView: {
    width: "100%",
    maxHeight: "90%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  shadow: {
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.7)",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5
  },
  card: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "rgba(26, 28, 33, 0.05)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 4
  },

  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  VerticalCenter: {
    alignItems: "center"
  },
  horizontalCenter: {
    justifyContent: "Center"
  },
  spaceBetween: {
    justifyContent: "space-between"
  },
  spaceAround: {
    justifyContent: "space-around"
  },

  flex1: {
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  paddingDefault: {
    paddingVertical: 12,
    paddingHorizontal: 16
  },
  p1: { padding: 2 },
  p2: { padding: 4 },
  p3: { padding: 6 },
  p4: { padding: 8 },
  p5: { padding: 10 },
  p6: { padding: 12 },
  p7: { padding: 14 },
  p8: { padding: 16 },
  p9: { padding: 18 },
  p10: { padding: 20 },
  p11: { padding: 22 },
  p12: { padding: 24 }
});
