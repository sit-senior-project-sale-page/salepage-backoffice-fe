<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed } from "vue";
import Swal from "sweetalert2";
import { useMainStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import SiteCard from "../components/SiteCard.vue";
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain class="mx-auto section">
      <CardBox>
        <div class="text-center font-semibold text-lg pb-8">User manage</div>
        <div class="rounded-md">
          <table class="text-sm text-left  rounded-md">
            <tbody class="">
                <tr
                class="font-bold bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td>user id</td>
                <td>name</td>
                <td>email</td>
                <td></td>
              </tr>
              
              <tr
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
              <td>guyjiraphat</td>
              <td>Jiraphat Phulprapha</td>
              <!-- <td>0970323243</td> -->
              <td>guy@mail.com</td>
              <td>detail button</td>
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
