import { defineStore } from "pinia";
import axios from "axios";

export const useMainStore = defineStore("main", {
  state: () => ({
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* Field focus with ctrl+k (to register only once) */
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
      if (payload.avatar) {
        this.userAvatar = payload.avatar;
      }
    },

    fetch(sampleDataKey) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        // headers: {
        //   "Content-type": "application/json",
        // },
      });

      httpService
        .get(`${sampleDataKey}`)
        .then((r) => {
          console.log(r.data);
          console.log(r.data.data);
          if (r.data && r.data.data) {
            this[sampleDataKey] = r.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    },

    post(sampleDataKey, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        // headers: {
        //   "Content-type": "application/json",
        // },
      });

      return httpService
        .post(`${sampleDataKey}`, data)
        .then((r) => {
          console.log(r.data);
          console.log(r.data.data);
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    },

    postFormData(sampleDataKey, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-type": "application/json",
        },
      });

      return httpService.post(`${sampleDataKey}`, data);
    },
  },
});
