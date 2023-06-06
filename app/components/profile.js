import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import profile from "../api/profile";

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const response = await profile.getProfile();
      const userData = response.data.data;
      // console.log(userData);
      setData(userData);
    };

    getProfile();
  }, []);

  if (data) {
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: data !== null ? data.profilePictureUrl : "",
          }}
        />

        <View style={styles.paragraph}>
          <Text style={styles.Name}>
            {data.firstName} {data.lastName}
          </Text>

          <Text style={styles.accountNumber}>{data.number}</Text>
          <Text style={styles.emailAddress}>{data.emailAddress}</Text>
          <Text style={styles.accountBalance}>
            Account Balance: ₦{Intl.NumberFormat().format(data.balance)}
          </Text>
        </View>
      </View>
    );
  } else {
    return <Text>Loading...</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    elevation: 5,
    borderRadius: 20,
  },
  image: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  Name: {
    color: "#207F95",
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  accountNumber: {
    fontWeight: "light",
    marginBottom: 5,
    fontSize: 14,
    textAlign: "center",
  },
  emailAddress: {
    fontWeight: "light",
    marginBottom: 5,
    fontSize: 14,
    textAlign: "center",
  },
  accountBalance: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 14,
    textAlign: "center",
  },
});

export default Profile;
