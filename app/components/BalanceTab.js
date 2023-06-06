import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import balance from "../api/balance";

const BalanceTab = () => {
  const [data, setData] = useState(null);

  const intervalId = setInterval(() => {
    const getBalance = async () => {
      const response = await balance.getBalance();
      const userBalance = response.data.data.balance;
      setData(userBalance);
    };

    getBalance();
  }, 5000); // 500 milliseconds = 0.5 second

  useEffect(() => {
    clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.accountBalance}>
        ₦{Intl.NumberFormat().format(data)}{" "}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  accountBalance: {
    color: "#0DDE65",
    backgroundColor: "#003399",
    fontWeight: "bold",
    fontSize: 14,
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },
  container: {
    height: 56,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#207F95",
  },
});

export default BalanceTab;
