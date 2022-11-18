import { defineStore } from "pinia";
import { fetchWrapper, authHeader } from "@/helpers";
import axios from "axios";

export const useSiteStore = defineStore("site", {
  state: () => ({
    site: {},
    sites: [],
    siteById: {},
    loading: false,
    error: null,
  }),
  getters: {
    getSiteAll: (state) => {
      return () => state.site;
    },

    getSiteById: (state) => {
      return (id) => state.sites.find((t) => t.id === id);
    },
  },
  actions: {
    async fetchSiteAll() {
      const data = await fetchWrapper.get("site");
      if (data.data) {
        this.sites = data.data;
      }
    },

    async fetchSiteById(id) {
      this.loading = true;
      try {
        this.site = await fetchWrapper
          .get(`site/${id}`)
          .then((response) => response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async createSite(sampleDataKey, data) {
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-type": "application/json",
          ...authHeader(),
        },
      });

      return httpService.post(`${sampleDataKey}`, data);
    },

    async updateSite(siteUrl, data) {
      this.loading = true;
      const httpService = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        headers: {
          "Content-type": "application/json",
          ...authHeader(),
        },
      });
      try {
        return httpService.patch(`${siteUrl}`, data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});
