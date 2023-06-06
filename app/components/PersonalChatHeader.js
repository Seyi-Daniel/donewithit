import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function PersonalChatHeader({ title, image }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.text}>{title}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity>
          <MaterialCommunityIcons name="phone" size={25} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialCommunityIcons name="video" size={25} color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity>
          <SimpleLineIcons
            name="options-vertical"
            size={25}
            color={colors.white}
          />
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
    justifyContent: "space-between",
    //paddingRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  text: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default PersonalChatHeader;
