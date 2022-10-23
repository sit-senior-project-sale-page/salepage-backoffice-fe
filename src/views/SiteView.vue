<script setup>
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableSampleDynamic from "../components/TableSampleDynamic.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain
      form
      @submit.prevent="submit"
      color="white"
      class="mx-auto section rounded-lg"
    >
      <CardBox class="mb-6 pb-12">
        <div class="text-center font-semibold text-lg pb-8">My SalePage</div>
        <div class="grid md:grid-cols-3 gap-y-8" >
          <div>
            <div
              class="h-40 w-40 rounded-lg mx-auto mb-3 cursor-pointer"
              :style="{
                'background-image': `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                'background-position': 'center',
              }"
            ></div>
            <div class="font-medium text-center cursor-pointer">Midnight Guest</div> 
          </div>

          <div>
            <div
              class="h-40 w-40 rounded-lg mx-auto mb-3 cursor-pointer"
              :style="{
                'background-image': `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                'background-position': 'center',
              }"
            ></div>
            <div class="font-medium text-center cursor-pointer">Midnight Guest</div> 
          </div><div>
            <div
              class="h-40 w-40 rounded-lg mx-auto mb-3 cursor-pointer"
              :style="{
                'background-image': `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                'background-position': 'center',
              }"
            ></div>
            <div class="font-medium text-center cursor-pointer">Midnight Guest</div> 
          </div><div>
            <div
              class="h-40 w-40 rounded-lg mx-auto mb-3 cursor-pointer"
              :style="{
                'background-image': `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                'background-position': 'center',
              }"
            ></div>
            <div class="font-medium text-center cursor-pointer">Midnight Guest</div> 
          </div><div>
            <div
              class="h-40 w-40 rounded-lg mx-auto mb-3 cursor-pointer"
              :style="{
                'background-image': `url(${img})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                'background-position': 'center',
              }"
            ></div>
            <div class="font-medium text-center cursor-pointer">Midnight Guest</div> 
          </div>
          
        </div>
      </CardBox>
      <!-- <TableSampleDynamic data-fetch="site" /> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
<script>
export default {
  data() {
    return {
      img: "https://cf.shopee.co.th/file/f4b555ec1103020de76771be403c4bcc",
    };
  },
  mounted() {
    console.log(this.site);
  },
};
</script>
<style scoped>
@media (min-width: 900px) {
  .section {
    width: 860px;
  }
}
</style>
