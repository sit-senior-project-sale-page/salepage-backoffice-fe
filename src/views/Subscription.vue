<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import SupScriptionComponent from "@/components/SubScription.vue";
import SupScriptionPaymentComponent from "@/components/SubScriptionPayment.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { ref } from "vue";

const next = ref(false);
const state = ref(0);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
        <div
          class="flex flex-col my-auto mx-auto text-left md:px-5 py-10 w-full box"
        >
          <Transition mode="out-in">
            <div v-if="next">
              <div class="text-3xl font-semibold head">Choose your plan</div>
              <SupScriptionComponent></SupScriptionComponent>
            </div>
            <div v-else-if="state == 2">
              <div class="text-3xl font-semibold head">Payment your plan</div>
              <SupScriptionPaymentComponent></SupScriptionPaymentComponent>
            </div>
          </Transition>
          <button
            class="p-4 text-white rounded-md font-medium mt-10 mx-auto"
            @click="(state += 1), (next = !next)"
          >
            Next
          </button>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
<!-- <script>
export default {
  data() {
    return {
      
    };
  },
};
</script> -->
<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
