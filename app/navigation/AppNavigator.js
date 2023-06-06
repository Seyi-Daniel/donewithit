import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import BotScreen from "../screens/BotScreen";
import ChatScreen from "../screens/ChatScreen";
import ChatHeader from "../components/ChatHeader";
import PersonalChatHeader from "../components/PersonalChatHeader";
import MessagesHeader from "../components/MessagesHeader";
import MessagesScreen from "../screens/MessagesScreen";
import BotTransactionScreen from "../screens/BotTransactionScreen";
import ContactScreen from "../screens/ContactScreen";

import HistoryNavigator from "./HistoryNavigator";

import colors from "../config/colors";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.middle,
      },
    }}
  >
    <Stack.Screen
      name="Messages"
      component={MessagesScreen}
      options={{
        headerTitle: () => <MessagesHeader />,
      }}
    />
    <Stack.Screen name="Account" component={AccountScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({ route }) => ({
        headerTitle: () => (
          <PersonalChatHeader
            title={route.params.firstName}
            image={route.params.profilePictureUrl}
          />
        ),
      })}
    />
    <Stack.Screen
      name="BotChat"
      component={BotScreen}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader title="Prime" image />,
      })}
    />
    <Stack.Screen
      name="History"
      component={HistoryNavigator}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader title="Transaction History" image />,
      })}
    />
    <Stack.Screen
      name="Contacts"
      component={ContactScreen}
      options={({ route }) => ({
        headerTitle: () => <ChatHeader title="Contact Screen" image />,
      })}
    />
  </Stack.Navigator>
);
