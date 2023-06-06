import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";
import chatApi from "../api/chat";
import useApi from "../hooks/useApi";
import BalanceTab from "./BalanceTab";

function ChatTools({ accountNo, refresh, setRefresh }) {
  const [toggle, setToggle] = useState(false);
  const [toggleColor, setToggleColor] = useState();

  const handlePress = () => {
    if (toggle) {
      setToggle(false);
      setToggleColor(null);
    } else {
      setToggle(true);
      setToggleColor(colors.green);
    }
  };

  const handleSubmit = (message, { resetForm }) => {
    const type = toggle ? "Transaction" : "Text";
    const chat = { ...message, type };

    if (chat.payload != "") {
      chatApi.sendChat(chat);
      resetForm();
      setRefresh(!refresh);
    }
    resetForm();
  };

  return (
    <View>
      <BalanceTab />
      <View style={styles.container}>
        <AppButton
          style={
            toggle
              ? { ...styles.button, ...styles.toggleEffect }
              : styles.button
          }
          onPress={handlePress}
        >
          <MaterialCommunityIcons
            name="currency-ngn"
            size={30}
            color={toggleColor}
          />
        </AppButton>
        <Form
          initialValues={{ recipientNumber: accountNo, payload: "" }}
          onSubmit={handleSubmit}
        >
          {toggle ? (
            <FormField
              keyboardType="numeric"
              maxLength={10}
              name="payload"
              placeholder="Amount"
              width="68.5%"
            />
          ) : (
            <FormField
              multiline
              name="payload"
              numberOfLines={1}
              placeholder="Enter message"
              width="68.5%"
            />
          )}
          <SubmitButton style={styles.button}>
            <MaterialCommunityIcons name="send" size={30} />
          </SubmitButton>
        </Form>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.blue,
    borderRadius: 40,
    height: 75,
    width: 75,
  },
  toggleEffect: {
    borderWidth: 5,
    borderColor: colors.green,
  },
});

export default ChatTools;
