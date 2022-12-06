<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed, ref } from "vue";
import Swal from "sweetalert2";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import SiteCard from "../components/SiteCard.vue";
import { useAdminStore } from "@/stores/admin";
import BaseButton from "@/components/BaseButton.vue";

const adminStore = useAdminStore();
const { admin, loading } = storeToRefs(adminStore);
const members = ref([]);

const fetchData = async () => {
  const res = await adminStore.fetchMember();
  // console.log(res);
  members.value = res;
};

const toggleEnable = async (id, enable) => {
  const dto = {
    memberId: id,
    isEnable: enable,
  };
  const res = await adminStore.editMember(dto);
  if (res) {
    Swal.fire('update successful');
    fetchData();
  }
}

const deleteMember = async (id) => {
  const dto = {
    memberId: id,
    isDelete: true,
  };
  const res = await adminStore.editMember(dto);
  if (res) {
    Swal.fire('delete successful');
    fetchData();
  }
};

fetchData();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">User manage</div>
        <div class="rounded-md">
          <p v-if="loading" class="text-center font-semibold text-lg pb-8">
            Loading Data....
          </p>
          <table v-else class="text-sm text-left rounded-md">
            <!-- {{ members }} -->
            <tbody class="">
              <tr
                class="font-bold bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>User ID</td>
                <td>Name</td>
                <td>Status</td>
                <td>Action</td>
              </tr>

              <tr
                v-for="member in members"
                :key="member.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>{{ member.id }}</td>
                <td>{{ member.username }}</td>
                <!-- <td>0970323243</td> -->
                <td
                  :class="member.isEnable ? 'text-green-500' : 'text-red-400'"
                >
                  {{ member.isEnable ? "enabled" : "disabled" }}
                </td>
                <td class="flex justify-center space-x-2">
                  <BaseButton
                    style="background-color: #ffb730"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    :label="member.isEnable ? 'disable' : 'enable'"
                    @click="toggleEnable(member.id,!member.isEnable)"
                  />
                  <BaseButton
                    style="background-color: red"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    label="delete"
                    @click="deleteMember(member.id)"
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
