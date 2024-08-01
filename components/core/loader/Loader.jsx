import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback
} from "react-native";
import {
  Modal,
  Portal,
  ActivityIndicator,
  MD2Colors,
  Provider
} from "react-native-paper";
import { Colors } from "../../../theme/Colors";

const Loader = ({ isVisible }) => {
  return (
    <View style={styles.container}>
      <Portal>
        {isVisible && (
          <View style={styles.backdrop}>
            <View style={styles.modalContainer}>
              <ActivityIndicator
                animating={true}
                color={Colors.primaryBlue}
                size="large"
              />
            </View>
          </View>
        )}
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loader;
