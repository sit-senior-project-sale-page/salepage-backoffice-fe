<script setup>
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import { computed } from "vue";
import Swal from "sweetalert2";
import router from "../router";
import { RouterLink } from "vue-router";
import { useMainStore } from "@/stores/main";

// const mainStore = useMainStore();
// mainStore
//   .fetch(
//     "site",
//     `site?${new URLSearchParams({
//       search: "product",
//     })}`
//   )
//   .catch((error) => {
//     Swal.fire({
//       title: "Error",
//       text: error,
//       icon: "error",
//     });
//   });

// const sites = computed(() => mainStore.site);
// console.log("🚀 ~ file: SiteView.vue ~ line 27 ~ sites", sites);
</script>

<template>
  <LayoutAuthenticated
    ><SectionMain
      ><CardBox>
        <div
          class="flex flex-col my-auto mx-auto text-left md:px-5 py-10 w-full box"
          style="transition-duration: 0.25s"
        >
          <div class="text-3xl font-semibold head">Choose your plan</div>

          <div
            class="mt-10 text-sm font-light rounded-2xl bg-white p-6 text-black md:hidden space-y-3"
            style="border-color: #000000; border-width: 1.5px"
          >
            <div class="text-xl font-semibold mb-5">Monthly subscribtion</div>

            <div
              class="p-3 rounded-lg"
              style="border-color: #20293a; border-width: 1.5px"
              v-if="plan == 'starter'"
            >
              <div class="font-semibold mb-3" style="color: #20293a;">Starter Plan</div>
              <div class="rounded-lg text-xl font-medium plan2">
                <span class="mr-5">299 THB</span><span>1 SalePage</span>
              </div>
              <div class="rounded-lg text-xl font-medium plan2"></div>
            </div>
            <div
              class="p-3 rounded-lg"
              style="border-color: #c5d4e1; border-width: 1.5px"
              v-if="plan != 'starter'"
              @click="plan = 'starter'"
            >
              <div class="font-semibold mb-3" style="color: #20293a;">Starter Plan</div>
              <div class="rounded-lg text-xl font-medium plan2">
                <span class="mr-5">299 THB</span><span>1 SalePage</span>
              </div>
              <div class="rounded-lg text-xl font-medium plan2"></div>
            </div>

            <div
              class="p-3 rounded-lg"
              style="border-color: #20293a; border-width: 1.5px"
              v-if="plan == 'business'"
            >
              <div class="font-semibold mb-3" style="color: #20293a;">Starter Plan</div>
              <div class="rounded-lg text-xl font-medium plan2">
                <span class="mr-5">1299 THB</span><span>5 SalePage</span>
              </div>
              <div class="rounded-lg text-xl font-medium plan2"></div>
            </div>
            <div
              class="p-3 rounded-lg"
              style="border-color: #c5d4e1; border-width: 1.5px"
              v-if="plan != 'business'"
              @click="plan = 'business'"
            >
              <div class="font-semibold mb-3" style="color: #20293a;">Starter Plan</div>
              <div class="rounded-lg text-xl font-medium plan2">
                <span class="mr-5">1299 THB</span><span>5 SalePage</span>
              </div>
              <div class="rounded-lg text-xl font-medium plan2"></div>
            </div>

          </div>
          <div
            class="mt-10 text-sm font-light rounded-2xl bg-white p-6 text-black hidden md:block"
            style="border-color: #000000; border-width: 1.5px"
          >
            <div class="text-xl font-semibold mb-5">Monthly subscribtion</div>
            <div class="grid grid-cols-3">
              <div></div>
              <div
                v-if="plan == 'starter'"
                class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
              >
                Starter Plan
              </div>
              <div
                v-if="plan != 'starter'"
                @click="plan = 'starter'"
                class="p-2 md:px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
              >
                Starter Plan
              </div>
              <div
                v-if="plan == 'business'"
                class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer plan1"
              >
                Business Plan
              </div>
              <div
                @click="plan = 'business'"
                v-if="plan != 'business'"
                class="p-2 px-4 mx-auto rounded-lg text-center text-white font-semibold cursor-pointer deselect1"
              >
                Business Plan
              </div>
            </div>

            <div class="grid grid-cols-3 my-5">
              <div class="font-light my-auto">Price</div>
              <div
                v-if="plan == 'starter'"
                class="mx-auto rounded-lg text-center text-xl font-medium plan2"
              >
                299 THB
              </div>
              <div
                v-if="plan != 'starter'"
                class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
              >
                299 THB
              </div>
              <div
                v-if="plan == 'business'"
                class="mx-auto rounded-lg text-center text-xl font-medium plan2"
              >
                1299 THB
              </div>
              <div
                v-if="plan != 'business'"
                class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
              >
                1299 THB
              </div>
            </div>

            <div
              class="w-full my-auto"
              style="height: 0.5px; background-color: #000000"
            />

            <div class="grid grid-cols-3 mt-5">
              <div class="font-light my-auto">SalePage Amount</div>
              <div
                v-if="plan == 'starter'"
                class="mx-auto rounded-lg text-center text-xl font-medium plan2"
              >
                1
              </div>
              <div
                v-if="plan != 'starter'"
                class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
              >
                1
              </div>
              <div
                v-if="plan == 'business'"
                class="mx-auto rounded-lg text-center text-xl font-medium plan2"
              >
                5
              </div>
              <div
                v-if="plan != 'business'"
                class="mx-auto rounded-lg text-center text-xl font-medium deselect2"
              >
                5
              </div>
            </div>
          </div>
          <button
            class="p-4 text-white rounded-md font-medium mt-10 mx-auto"
            @click="state += 1"
          >
            Next
          </button>
          <!-- <div
  class="mx-auto text-gray-400 hover:text-gray-600 px-3 py-2 mt-5 cursor-pointer"
  @click="state -= 0.5"
>
  Back
</div> -->
        </div>
      </CardBox></SectionMain
    ></LayoutAuthenticated
  >
</template>
<script>
export default {
  data() {
    return {
      state: 3,
      state1: true,
      state2: false,
      state3: false,

      plan: "starter",

      validate: {
        plan: true,
      },
    };
  },
};
</script>
<style scoped>
button {
  transition-duration: 0.25s;
  width: 100%;
  background-color: #ffb522;
}
button:hover {
  background-color: #f6a709;
}
.plan1 {
  background-color: #20293a;
  transition-duration: 0.25s;
}
.plan2 {
  color: #20293a;
  transition-duration: 0.25s;
}
.deselect1 {
  background-color: #c5d4e1;
  transition-duration: 00.25s;
}
.deselect1:hover {
  background-color: #89a9c8;
  transition-duration: 0.25s;
}
.deselect2 {
  color: #c5d4e1;
  transition-duration: 00.25s;
}

#choice2:hover .deselect2 {
  color: #89a9c8 !important;
}
.box {
  padding: 15px;
}
@media (min-width: 820px) {
  .box {
    width: 800px;
    padding: 40px;
  }
  .head {
    /* width: 800px; */
  }
}
</style>
