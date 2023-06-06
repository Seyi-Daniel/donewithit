import client from "./client";

const endpoint = "/api/bot/history";

const getBotHistory = () => client.get(endpoint);

export default {
  getBotHistory,
};
