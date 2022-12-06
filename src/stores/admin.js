import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    admin: {},
    loading: false,
    loadingPost: false,
  }),
  getters: {
    getAdmin: (state) => {
      return state;
    },
  },
  actions: {
    async fetchMember() {
      this.loading = true;
      try {
        return await fetchWrapper
          .get(`bo/member`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async editMember(dto) {
      this.loadingPost = true;
      return await fetchWrapper
        .patch(`bo/member/edit`, dto)
        .then((response) => response.data);
    },

    async fetchOrderPlan() {
      this.loading = true;
      try {
        return await fetchWrapper
          .get(`bo/orderplan`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async editOrderPlan(dto) {
      this.loadingPost = true;
      return await fetchWrapper
        .patch(`bo/member/approve`, dto)
        .then((response) => response.data);
    },
    async fetchSite() {
      this.loading = true;
      try {
        return await fetchWrapper
          .get(`bo/site`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async editSite(dto) {
      this.loadingPost = true;
      return await fetchWrapper
        .patch(`bo/site/edit`, dto)
        .then((response) => response.data);
    },
    async createAdmin(dto) {
      this.loadingPost = true;
      return await fetchWrapper
        .patch(`bo/create/`, dto)
        .then((response) => response.data);
    },
    async fetchAdmin() {
      this.loading = true;
      try {
        return await fetchWrapper
          .get(`bo/admin`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateAdmin(dto) {
      this.loadingPost = true;
      return await fetchWrapper.patch(`bo/edit`, dto);
    },
  },
});
