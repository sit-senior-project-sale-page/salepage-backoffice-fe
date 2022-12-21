<script setup>
import SectionMain from "@/components/Section/SectionMain.vue";
import SupScriptionComponent from "@/components/SubScription.vue";
import SupScriptionPaymentComponent from "@/components/SubScriptionPayment.vue";
import SubScriptionConfirmComponent from "@/components/SubScriptionConfirm.vue";
import CardBox from "@/components/Card/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { ref } from "vue";
import Swal from "sweetalert2";
import { usePlanStore } from "@/stores/plan.js";
import { storeToRefs } from "pinia";
const state = ref(1);
const selectPlan = ref("");

const { plan, loading, loadingPost } = storeToRefs(usePlanStore());

const userPlanStore = usePlanStore();

userPlanStore.fetchPlan();

const passProps = (plan) => {
  selectPlan.value = plan;
};

const registerPlan = () => {
  userPlanStore
    .registerPlan({
      plan: selectPlan.value,
    })
    .then(() => {
      loadingPost.value = false;
      Swal.fire({
        title: "Wait",
        text: "Please waiting for confirmation",
        icon: "success",
        allowOutsideClick: false,
      }).then((t) => {
        if (t.isConfirmed) {
          window.location.reload();
        }
      });
    })
    .catch((error) => {
      loadingPost.value = false;
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        allowOutsideClick: false,
      }).then((t) => {
        if (t.isConfirmed) {
          window.location.reload();
        }
      });
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox>
        <p v-if="loading" class="text-center font-semibold text-lg pb-8">
          Loading Data....
        </p>
        <div
          v-else
          class="flex flex-col my-auto mx-auto text-left md:px-5 py-10 w-full box"
        >
          <div v-if="plan">
            <div class="mb-2 text-3xl font-semibold head">Your Plan</div>
            <div
              class="mb-2 text-sm font-light rounded-2xl bg-white p-6 text-black md:space-y-3"
              style="border-color: #000000; border-width: 1.5px"
            >
              <div
                class="p-3 rounded-lg"
                style="border-color: #20293a; border-width: 1.5px"
              >
                <div class="font-semibold mb-3" style="color: #20293a">
                  {{ plan.plan }} Plan
                </div>
                <div class="rounded-lg text-xl font-medium plan2">
                  <span class="mr-5"
                    >Expire At
                    {{
                      new Date(plan.endDatePlan).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        weekday: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}</span
                  ><br /><span
                    >Can Create
                    {{ plan.plan == "STARTER" ? "1" : "5" }} SalePage</span
                  >
                </div>
                <div class="rounded-lg text-xl font-medium plan2"></div>
              </div>
            </div>
          </div>
          <Transition v-else mode="out-in">
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
            v-if="!plan"
            class="p-4 text-white rounded-md font-medium mt-10 mx-auto"
            :class="loadingPost ? 'cursor-not-allowed opacity-70' : ''"
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
