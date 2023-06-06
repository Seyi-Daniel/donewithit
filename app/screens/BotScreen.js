import React, { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import chatApi from "../api/chat";
import BotChatTool from "../components/BotChatTool";
import colors from "../config/colors";
import useApi from "../hooks/useApi";

function BotScreen({ route }) {
  const [responses, setResponse] = useState([
    {
      id: 1,
      interaction: "Received",
      payload: "Hey 👋\nI'm Prime, your virtual assistant from Optimus Bank.",
    },
  ]);
  const [temp, setTemp] = useState({
    id: 2,
    interaction: "Received",
    payload:
      "Here are a list I can help you with\n\n1. Balance Inquiry\n 2. Airtime/Data Purchase\n 3. Transfer\n 4. Bill Payment\n 5. Get Statement\n 6. Loan Request\n 7. Change PIN\n 8. Log Complaints\n 9. FAQ\n10. Nearest Agent",
  });

  useEffect(() => {
    send(temp);
  }, [temp]);

  const send = (response) => {
    const delayedSend = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResponse([...responses, response]);
    };
    delayedSend();
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <FlatList
          ref={(ref) => (this.flatList = ref)}
          onContentSizeChange={() =>
            this.flatList.scrollToEnd({ animated: true })
          }
          onLayout={() => this.flatList.scrollToEnd({ animated: true })}
          data={responses}
          keyExtractor={(response) => response.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.chat}>
              <View
                style={{
                  ...styles.alignment[item.interaction],
                  ...styles.bubble[item.interaction],
                }}
              >
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  {item.payload}
                </Text>
              </View>
              <Text
                style={{
                  ...styles.alignment[item.interaction],
                  color: colors.light2,
                }}
              >
                {item.modified}
              </Text>
            </View>
          )}
        />
        <View>
          <BotChatTool send={send} tempState={setTemp} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bubble: {
    Sent: {
      backgroundColor: colors.middle,
      padding: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderBottomStartRadius: 10,
    },
    Received: {
      backgroundColor: colors.blue,
      padding: 10,
      borderTopStartRadius: 10,
      borderTopEndRadius: 10,
      borderBottomEndRadius: 10,
    },
  },
  chat: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  alignment: {
    Sent: {
      alignSelf: "flex-end",
    },
    Received: {
      alignSelf: "flex-start",
    },
  },
});

export default BotScreen;
