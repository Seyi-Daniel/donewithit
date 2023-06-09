import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
  children,
  title,
  onPress,
  color = "primary",
  ...otherProps
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        { ...otherProps.style },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>
        {title}
        {children}
      </Text>
    </TouchableOpacity>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
