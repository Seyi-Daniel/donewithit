import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import colors from "../config/colors";
import Icon from "../components/Icon";
import ListItem from "../components/OrdinaryListItem";
//import ListItem from "../components/ListItem";
import ListItemSeperator from "../components/ListItemSeperator";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import Profile from "../components/profile";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();

  return (
    <Screen style={styles.screen}>
      <View>
        <Profile />
      </View>
      <View style={styles.container}>
        <ListItem
          title="Transaction History"
          IconComponent={<Icon name="history" backgroundColor={colors.green} />}
          onPress={() => navigation.navigate("History")}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title="Log Out"
          IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
          onPress={() => logOut()}
        />
      </View>
    </Screen>
  );
}

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    backgroundColor: colors.white,
  },
  screen: {
    backgroundColor: colors.light,
  },
});
