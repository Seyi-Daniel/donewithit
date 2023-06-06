import React, { useState, useEffect, useContext } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import ActivityIndicator from "../components/ActivityIndicator";
import accountApi from "../api/account";
import contactsApi from "../api/contacts";

import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";

import routes from "../navigation/routes";
import AuthContext from "../auth/context";

import useApi from "../hooks/useApi";
import colors from "../config/colors";
import AppButton from "../components/AppButton";

const initialMessages = [];

function ContactScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: account,
    loading,
    request: loadAccount,
  } = useApi(accountApi.getAccount);

  const { data: contacts, request: loadContacts } = useApi(
    contactsApi.getContacts
  );

  useEffect(() => {
    loadAccount(user.nameid);
    loadContacts();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      {account.data && (
        <View style={{ flex: 1 }}>
          <FlatList
            // style={{ backgroundColor: "red" }}
            data={contacts.data}
            keyExtractor={(chat) => chat.beneficiaryNumber.toString()}
            renderItem={({ item }) => (
              <ListItem
                //badge={{ name: "circle", color: colors.green }}
                title={item.accountName}
                subTitle={item.beneficiaryNumber}
                image={{ uri: item.profilePicture }}
                onPress={() => navigation.navigate(routes.CHAT, item)}
              />
            )}
            ItemSeparatorComponent={ListItemSeperator}
            refreshing={refreshing}
            onRefresh={() => {}}
          />
          <AppButton
            style={styles.contactButton}
            onPress={() => navigation.push(routes.MESSAGES)}
          >
            <MaterialIcons name="chat-bubble-outline" size={24} />
          </AppButton>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 75,
    height: 75,
    borderRadius: 35,
  },
  welcome: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.light2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  contactButton: {
    backgroundColor: colors.blue,
    borderRadius: 40,
    height: 75,
    left: 370,
    bottom: 40,
    position: "relative",
    width: 75,
  },
});

export default ContactScreen;
