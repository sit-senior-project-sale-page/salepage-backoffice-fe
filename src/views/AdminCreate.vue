<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed, ref } from "vue";
import Swal from "sweetalert2";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";;

import { useAdminStore } from "@/stores/admin";
import BaseButton from "@/components/BaseButton.vue";
import AdminForm from "@/components/Admin/AdminForm.vue";

</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">
          Add Admin
        </div>
        <div class="rounded-md">
            <AdminForm />
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
