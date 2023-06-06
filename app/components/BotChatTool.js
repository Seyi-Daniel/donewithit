import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AppForm as Form,
  AppFormField as FormField,
  SubmitButton,
} from "../components/forms";
import colors from "../config/colors";

import balanceApi from "../api/balance";
import useApi from "../hooks/useApi";

function BotChatTool({ accountNo, send, tempState }) {
  const { data: balance, request: loadBalance } = useApi(balanceApi.getBalance);

  useEffect(() => {
    loadBalance();
  }, []);

  const dualOutput = (myMessage, botMessage) => {
    const me = () => {
      send({
        id: Math.round(Math.random() * 1000),
        interaction: "Sent",
        payload: myMessage,
      });
      const bot = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        tempState({
          id: Math.round(Math.random() * 1000),
          interaction: "Received",
          payload: botMessage,
        });
      };
      bot();
    };
    me();
  };
  const justMe = async (message) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    send({
      id: Math.round(Math.random() * 1000),
      interaction: "Sent",
      payload: message,
    });
  };
  const justBot = async (message) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    send({
      id: Math.round(Math.random() * 1000),
      interaction: "Received",
      payload: message,
    });
  };

  const [controller, setController] = useState(1);

  const control = (message) => {
    switch (controller) {
      case 0:
        break;
      case 1:
        process(message);
        break;
      case (2, 3, 4, 5, 6, 7, 9, 10):
        process(message);
        break;
      case 8:
        process(message);
        break;
      case 13:
        complaints(message);
        setController(1);
      default:
    }
  };

  const process = (message) => {
    switch (message.payload) {
      case "1":
        dualOutput(
          message.payload,
          "Your balance is ₦" + Intl.NumberFormat().format(balance.data.balance)
        );
        break;
      case "2":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "3":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "4":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "5":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "6":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "7":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "9":
        dualOutput(message.payload, "Coming Soon");
        //setController(2);
        break;
      case "10":
        dualOutput(message.payload, "Coming Soon");
      //setController(2);
      case "8":
        dualOutput(message.payload, "Please enter your complaints");
        setController(13);
        break;
      default:
    }
  };

  const complaints = (message) => {
    dualOutput(
      message.payload,
      message.payload + "\n\n\nYour complaint has been logged"
    );
    setController(1);
  };

  const handleSubmit = (message, { resetForm }) => {
    if (message.payload != "") {
      //process(message);
      control(message);
    }
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Form initialValues={{ payload: "" }} onSubmit={handleSubmit}>
        {
          (toggle = false ? (
            <FormField
              keyboardType="numeric"
              maxLength={10}
              name="payload"
              placeholder="Amount"
              width="67%"
            />
          ) : (
            <FormField
              multiline
              name="payload"
              numberOfLines={1}
              placeholder="Enter message"
              width="75%"
            />
          ))
        }
        <SubmitButton style={styles.button}>
          <MaterialCommunityIcons name="send" size={30} />
        </SubmitButton>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    borderRadius: 40,
    height: 75,
    width: 75,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  toggleEffect: {
    borderWidth: 5,
    borderColor: colors.green,
  },
});

export default BotChatTool;
