import client from "./client";

const endpoint = "/api/Contact/All";

const getContacts = () => client.get(endpoint);

const endpoint1 = "/all";

const getPrevious = () => client.get(endpoint1);

export default {
  getContacts,
  getPrevious,
};
