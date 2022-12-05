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
    sites: [],
    product: [],
    productsOption: [],
    order: [],
    orderBySiteId: [],
    siteById: {},
    loading: false,
    error: {},
    statusSuccess: false,
    statusError: false,
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
      // console.log("🚀 ~ file: main.js ~ line 34 ~ fetch ~ data", data.data);
      if (data.data) {
        this[state] = data.data;
      }
    },

    async post(url, data) {
      this.loading = true;
      return await fetchWrapper
        .post(url, data)
        .then(() => ((this.loading = false), (this.statusSuccess = true)))
        .catch(
          (error) => (
            console.log(error),
            (this.error = error),
            (this.statusError = true),
            (this.loading = false)
          )
        );
    },

    postFormData(sampleDataKey, data) {
      this.loading = true;
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-type": "application/json",
          ...authHeader(),
        },
      });

      httpService
        .post(`${sampleDataKey}`, data)
        .then(() => ((this.loading = false), (this.statusSuccess = true)))
        .catch(
          (error) => (
            console.log(error),
            (this.error = error),
            (this.statusError = true),
            (this.loading = false)
          )
        );
    },
  },
});
