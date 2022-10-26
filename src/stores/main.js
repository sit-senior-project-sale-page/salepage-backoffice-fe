import { defineStore } from "pinia";
import { fetchWrapper, authHeader } from "@/helpers";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,

    isFieldFocusRegistered: false,

    /* Sample data (commonly used) */
    clients: [],
    history: [],
    site: [],
    product: [],
    productsOption: [],
    order: [],
  }),
  actions: {
    setUser(payload) {
      if (payload.name) {
        this.userName = payload.name;
      }
      if (payload.email) {
        this.userEmail = payload.email;
      }
    },

    async fetch(state, url) {
      const data = await fetchWrapper.get(url);
      console.log("🚀 ~ file: main.js ~ line 34 ~ fetch ~ data", data.data);
      if (data.data) {
        this[state] = data.data;
      }
    },

    async post(url, data) {
      return await fetchWrapper.post(url, data);
    },

    postFormData(sampleDataKey, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-type": "application/json",
          ...authHeader(),
        },
      });

      return httpService.post(`${sampleDataKey}`, data);
    },
  },
});
