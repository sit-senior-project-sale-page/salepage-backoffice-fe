<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import SupScriptionComponent from "@/components/SubScription.vue";
import SupScriptionPaymentComponent from "@/components/SubScriptionPayment.vue";
import SubScriptionConfirmComponent from "@/components/SubScriptionConfirm.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { ref, watch } from "vue";
import Swal from "sweetalert2";
import { usePlanStore } from "@/stores/plan.js";
import { storeToRefs } from "pinia";
const state = ref(1);
const selectPlan = ref("");

const { loading } = storeToRefs(usePlanStore());

const userPlanStore = usePlanStore();

const passProps = (plan) => {
  selectPlan.value = plan;
};

const registerPlan = () => {
  userPlanStore
    .registerPlan({
      plan: selectPlan.value,
    })
    .then(() => {
      loading.value = false;
      Swal.fire({
        title: "Wait",
        text: "โปรดรอการอนุมัติจากระบบ",
        icon: "success",
      });
    })
    .catch((error) => {
      loading.value = false;
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
        <div
          class="flex flex-col my-auto mx-auto text-left md:px-5 py-10 w-full box"
        >
          <Transition mode="out-in">
            <div v-if="state == 1">
              <div class="text-3xl font-semibold head">Choose your plan</div>
              <SupScriptionComponent
                @set-plan="passProps"
              ></SupScriptionComponent>
            </div>
            <div v-else-if="state == 2">
              <div class="text-3xl font-semibold head">Payment your plan</div>
              <SupScriptionPaymentComponent
                :plan="selectPlan"
              ></SupScriptionPaymentComponent>
            </div>
            <div v-else-if="state == 3">
              <div class="text-3xl font-semibold head">
                Please Send Slip to Line
              </div>
              <SubScriptionConfirmComponent></SubScriptionConfirmComponent>
            </div>
          </Transition>
          <button
            class="p-4 text-white rounded-md font-medium mt-10 mx-auto"
            :class="loading ? 'cursor-not-allowed opacity-70' : ''"
            @click="
              state == 1
                ? (state = 2)
                : state == 2
                ? (state = 3)
                : state == 3
                ? registerPlan()
                : (state = 1)
            "
          >
            {{ state == 3 ? "Confirm" : "Next" }}
          </button>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>

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
