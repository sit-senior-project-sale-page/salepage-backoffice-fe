<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";

import { useAdminStore } from "@/stores/admin";
import BaseButton from "@/components/BaseButton.vue";

const adminStore = useAdminStore();
const { admin, loading, loadingPost } = storeToRefs(adminStore);
const sites = ref([]);

const fetchData = async () => {
  const res = await adminStore.fetchSite();
  // console.log(res);
  sites.value = res;
};

const toggleEnable = async (id, enable) => {
  const dto = {
    sitePageId: id,
    isEnable: enable,
  };
  await adminStore
    .editSite(dto)
    .then(() => {
      loadingPost.value = false;
      Swal.fire("update successful").then((t) => {
        if (t.isConfirmed) {
          fetchData();
        }
      });
    })
    .catch((error) => {
      loadingPost.value = false;
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
};

const deleteSite = async (id) => {
  const dto = {
    sitePageId: id,
    isDelete: true,
  };
  await adminStore
    .editSite(dto)
    .then(() => {
      loadingPost.value = false;
      Swal.fire("delete successful").then((t) => {
        if (t.isConfirmed) {
          fetchData();
        }
      });
    })
    .catch((error) => {
      loadingPost.value = false;
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
};

fetchData();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">
          SalePage manage
        </div>
        <div class="rounded-md">
          <p v-if="loading" class="text-center font-semibold text-lg pb-8">
            Loading Data....
          </p>
          <table v-else class="text-sm text-left rounded-md">
            <tbody class="">
              <tr
                class="font-bold bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>ID</td>
                <td>Domain</td>
                <td>Status</td>
                <td>Owner</td>
                <td>Action</td>
              </tr>
              <tr
                v-for="site in sites"
                :key="site.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>
                  <div class="flex">
                    <div class="my-auto ml-5">{{ site.id }}</div>
                  </div>
                </td>
                <td>{{ site.domain }}</td>
                <td :class="site.isEnable ? 'text-green-500' : 'text-red-400'">
                  {{ site.isEnable ? "enabled" : "disabled" }}
                </td>
                <td>{{ site.member.username }}</td>
                <td class="flex justify-center space-x-2">
                  <BaseButton
                    style="background-color: #ffb730"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    :label="site.isEnable ? 'disable' : 'enable'"
                    :disabled="loadingPost"
                    @click="toggleEnable(site.id, !site.isEnable)"
                  />
                  <BaseButton
                    style="background-color: red"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    label="delete"
                    :disabled="loadingPost"
                    @click="deleteSite(site.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div> </CardBox></SectionMain
  ></LayoutAuthenticated>
</template>
<style scoped>
@media (min-width: 900px) {
  .section {
    width: 1000px;
  }
}
</style>
