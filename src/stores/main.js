import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import Swal from "sweetalert2";
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

    async fetch(url) {
      const data = await fetchWrapper.get(url);
      if (data.data && data.data) {
        this[url] = data.data;
      }
      // httpService
      //   .get(`${url}`)
      //   .then((r) => {
      //     console.log(r.data);
      //     console.log(r.data.data);
      //     if (r.data && r.data.data) {
      //       this[url] = r.data.data;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     Swal.fire({
      //       title: "Error",
      //       text: error,
      //       icon: "error",
      //     });
      //   });
    },

    post(url, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      });

      return httpService
        .post(`${url}`, data)
        .then((r) => {
          console.log(r.data);
          console.log(r.data.data);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "ERROR",
            text: error,
            icon: "error",
          });
        });
    },

    postFormData(url, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
      });

      return httpService
        .post(`${url}`, data)
        .then((r) => {
          console.log(r.data);
          console.log(r.data.data);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: "Error",
            text: error,
            icon: "error",
          });
        });
    },
  },
});
