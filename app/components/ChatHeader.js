import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function ChatHeader({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
  },
  buttons: {
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ChatHeader;
