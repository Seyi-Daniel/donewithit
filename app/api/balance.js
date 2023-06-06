import client from "./client";

const endpoint = "/api/Balance";

const getBalance = () => client.get(endpoint);

export default {
  getBalance,
};
