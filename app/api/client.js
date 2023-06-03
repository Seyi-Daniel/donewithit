import { create } from "apisauce";
import cache from "../utitlity/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "https://optichat.azurewebsites.net",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["Authorization"] = "bearer " + authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  // if (response.ok) {
  //   cache.store(url, response.data);
  //   return response;
  // }

  // const data = await cache.get(url);
  // return data ? { ok: true, data } : response;
  return response;
};

export default apiClient;
