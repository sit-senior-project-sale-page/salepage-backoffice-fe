<script setup>
import { mdiTableBorder } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import TableSampleDynamic from "../components/TableSampleDynamic.vue";
import OrderDetail from "../components/OrderDetail.vue";
import OrderCard from "../components/OrderCard.vue";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain
      form
      @submit.prevent="submit"
      color="white"
      class="mx-auto section rounded-lg"
    >
      <CardBox class="mb-6">
        <div class="text-center font-semibold text-lg pb-8">
          Orders
        </div>
<!-- <div class="grid col2" data-fetch="order" v-for="order in order" :key="order"> -->
        <div class="grid col2">
          <OrderCard @click="test"/>
        </div>

        <!-- <TableSampleDynamic checkable data-fetch="order" /> -->
      </CardBox>
    </SectionMain>

    <SectionMain id="orderdetail" class="detail hidden z-20 pt-24" style="background-color: rgba(0, 0, 0, 0.6);">
      <div class="detail -z-1" @click="test"></div>
      <OrderDetail/>
    </SectionMain>
    
  </LayoutAuthenticated>
</template>
<script>
export default {
  data() {
    return {
      toggle: false,
    }
  },
  methods: {
    test(){
      if (this.toggle==true){
        this.toggle = false
        document.getElementById('orderdetail').classList.add('hidden')
        console.log('1');
      } else {
        this.toggle = true
        document.getElementById('orderdetail').classList.remove('hidden')
        console.log('2');
      }
      console.log('3');
      
    }
  },
}
</script>
<style scoped>
@media (min-width: 768px) {
  .card {
    width: 360px;
  }
}
@media (min-width: 900px) {
  .section {
    width: 860px;
  }
  .col2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
.detail{
  position: absolute;
  top: 0px;
  height: 100vh;
  width: 100vw;
  overflow: auto;
}
@media (min-width: 1280px) {
  .detail{
    
  }
}
</style>
