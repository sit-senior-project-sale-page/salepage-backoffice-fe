<script setup>
import * as Yup from "yup";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import Swal from "sweetalert2";
const schema = Yup.object().shape({
  username: Yup.string().required("โปรดกรอก Username"),
  password: Yup.string().required("โปรดกรอก Password"),
});

function onSubmit(values, { setErrors }) {
  const authStore = useAuthStore();
  const { username, password } = values;

  return authStore.login(username, password).catch((error) => {
    Swal.fire({
      title: "Error",
      text: error.error,
      icon: "error",
    });
    setErrors({ apiError: error });
  });
}
</script>

<template>
  <div>
    <div class="px-8 w-screen py-6 absolute">
      <img src="/upforsale.png" class="h-14 md:h-20 mx-auto md:mx-0" />
    </div>
    <SectionFullScreen v-slot="{}">
      <Form
        v-slot="{ errors, isSubmitting }"
        :validation-schema="schema"
        class="p-8 sm:p-12 flex flex-col text-left rounded-2xl w-full mx-5 sm:mx-auto my-auto box"
        style="background-color: #142e46"
        @submit="onSubmit"
      >
        <div class="text-2xl sm:text-3xl font-bold text-white">Sign in</div>
        <div style="height: 70px" class="mt-8">
          <Field
            placeholder="username"
            name="username"
            type="text"
            class="bg-gray-100 rounded-md w-full p-2 sm:p-3 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline focus:shadow ring-offset-2 text-sm"
            :class="{ 'is-invalid': errors.username }"
          />
          <div class="text-red-500 m-2">{{ errors.username }}</div>
        </div>
        <div style="height: 70px" class="mt-2">
          <Field
            placeholder="password"
            name="password"
            type="password"
            class="bg-gray-100 rounded-md w-full p-2 sm:p-3 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline focus:shadow ring-offset-2 text-sm"
            :class="{ 'is-invalid': errors.password }"
          />
          <div class="text-red-500 m-2">{{ errors.password }}</div>
        </div>
        <div class="mt-3">
          <BaseButton
            style="background-color: #ffb730"
            class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
            type="submit"
            label="signin"
            :disabled="isSubmitting"
          />
        </div>
      </Form>
    </SectionFullScreen>
  </div>
</template>

<style scoped>
@media (min-width: 450px) {
  .box {
    width: 425px;
  }
}
.bg {
  background-color: #0f385f !important;
}
</style>
