import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";

import chatApi from "../api/chat";
import ChatTools from "../components/ChatTools";
import colors from "../config/colors";
import useApi from "../hooks/useApi";
import chat from "../api/chat";

import { format } from "date-fns";
import { enUS } from "date-fns/locale";

function ChatScreen({ route }) {
  const renderTime = (timestamp) => {
    const dateObj = new Date(timestamp);
    const formattedTime = format(dateObj, "h:mm a", { locale: enUS });
    return formattedTime;
  };

  const { data: chats, request: loadChats } = useApi(chatApi.getChat);

  const [refresh, setRefresh] = useState(true);

  const [temp, setTemp] = useState();

  // const intervalId = setInterval(() => {
  //   loadChats(route.params.beneficiaryNumber);
  // }, 1000);

  // useEffect(() => {
  //   clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   setInterval(loadChats(route.params.beneficiaryNumber), 10000);
  // }, [chats]);

  useEffect(() => {
    setInterval(() => {
      loadChats(route.params.number);
    }, 5000);
    const delay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      setTemp(chats);
    };
    delay();
  }, [refresh]);

  useEffect(() => {
    loadChats(route.params.number);
  }, [temp]);

  // useEffect(() => {
  //   loadChats(route.params.beneficiaryNumber);
  // }, [refreshApp]);

  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        {chats.data && (
          <FlatList
            //inverted={true}
            ref={(ref) => (this.flatList = ref)}
            onContentSizeChange={() =>
              this.flatList.scrollToEnd({ animated: true })
            }
            onLayout={() => this.flatList.scrollToEnd({ animated: true })}
            data={chats.data}
            keyExtractor={(listing) => listing.id.toString()}
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
                  {renderTime(item.modified)}
                </Text>
              </View>
            )}
          />
        )}
        <View>
          <ChatTools
            refresh={refresh}
            setRefresh={setRefresh}
            accountNo={route.params.beneficiaryNumber}
            //handleSubmit={handleSubmit}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  money: {
    Sent: {
      color: "green",
      fontSize: 18,
    },
    Received: {
      color: "red",
      fontSize: 18,
    },
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

export default ChatScreen;
