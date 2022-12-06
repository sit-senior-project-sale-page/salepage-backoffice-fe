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
      try {
        return await fetchWrapper
          .patch(`bo/member/edit`, dto)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
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
      try {
        return await fetchWrapper
          .patch(`bo/site/edit`, dto)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createAdmin(dto) {
      console.log("called");
      try {
        return await fetchWrapper
          .patch(`bo/create/`, dto)
          .then((response) => response.data);
      } catch (error) {
        console.log(error);
        this.error = error;
      } finally {
        this.loading = false;
      }
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
      try {
        return await fetchWrapper
          .patch(`bo/edit`, dto)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
