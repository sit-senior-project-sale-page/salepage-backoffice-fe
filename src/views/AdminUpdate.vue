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
const sites = ref([]);
const admins = ref([]);

const fetchData = async () => {
  const res = await adminStore.fetchAdmin();
  console.log(res);
  admins.value = res;
};

const toggleEnable = async (id, enable) => {
  const dto = {
    adminId: id,
    isEnable: enable,
  };
  const res = await adminStore.updateAdmin(dto);
  if (res) {
    Swal.fire(res.message || 'update successful');
    fetchData();
  }
};

const deleteAdmin = async (id) => {
  const dto = {
    adminId: id,
    isDelete: true,
  };
  const res = await adminStore.updateAdmin(dto);
  if (res) {
    Swal.fire(res.message || 'delete successful');
    fetchData();
  }
};

const changeRole = async (id, role) => {
const { value, isConfirmed } = await Swal.fire({
  title: 'Select Role',
  input: 'select',
  inputValue: role,
  inputOptions: {
    'Roles': {
      ADMIN: 'Admin',
      ADMIN_WEB: 'Website Admin',
    },
  },
  inputPlaceholder: 'Select ',
  showCancelButton: true,
})
if (value && isConfirmed) {
    const dto = {
    adminId: id,
    role: value,
  };
  const res = await adminStore.updateAdmin(dto);
  if (res) {
    Swal.fire(res.message || 'Update Role Successful');
    fetchData();
  }
}
}

fetchData();
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">
          Admin Update
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
                <td>Username</td>
                <td>Status</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
              <tr
                v-for="admin in admins"
                :key="admin.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>
                  <div class="flex">
                    <div class="my-auto ml-5">{{ admin.id }}</div>
                  </div>
                </td>
                <td>{{ admin.username }}</td>
                <td
                  :class="admin.isEnable ? 'text-green-500' : 'text-red-400'"
                >
                  {{ admin.isEnable ? "enabled" : "disabled" }}
                </td>
                <td>{{ admin.AdminUserRole[0] ? admin.AdminUserRole[0].role.name : 'No Role' }}</td>
                <td class="flex justify-center space-x-2">
                  <BaseButton
                    style="background-color: #ffb730"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    :label="admin.isEnable ? 'disable' : 'enable'"
                    @click="toggleEnable(admin.id,!admin.isEnable)"
                  />
                  <BaseButton
                    v-show="admin.AdminUserRole[0].role.name !== 'OWNER'"
                    style=""
                    class="p-3 sm:p-4 text-white bg-blue-500 rounded-md w-full font-medium border-none"
                    label="change role"
                    @click="changeRole(admin.id, admin.AdminUserRole[0].role.name)"
                  />
                  <BaseButton
                    style="background-color: red"
                    class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
                    label="delete"
                    @click="deleteAdmin(admin.id)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardBox></SectionMain
    ></LayoutAuthenticated
  >
</template>
<style scoped>
@media (min-width: 900px) {
  .section {
    width: 1000px;
  }
}
</style>
