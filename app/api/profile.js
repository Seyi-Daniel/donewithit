import client from "./client";

const endpoint = "/api/Account";

const getProfile = () => client.get(endpoint);

export default {
  getProfile,
};
