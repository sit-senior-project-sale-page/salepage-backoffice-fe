<script setup>
import * as Yup from "yup";
import SectionFullScreen from "@/components/Section/SectionFullScreen.vue";
import CardBox from "@/components/Card/CardBox.vue";
import FormField from "@/components/Form/FormField.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { Form, Field } from "vee-validate";
import { useAuthStore } from "@/stores/auth.js";
import { ref } from "vue";
import Swal from "sweetalert2";
import { storeToRefs } from "pinia";

import { useAdminStore } from "@/stores/admin";
import { useRouter } from "vue-router";

const adminStore = useAdminStore();
const { admin, loading, loadingPost } = storeToRefs(adminStore);

const role = ref("");
const schema = Yup.object().shape({
  username: Yup.string().required("Please fill username"),
  password: Yup.string().required("Please fill  Password"),
});

const router = useRouter();

const onSubmit = async (values, { setErrors }) => {
  if (!role.value) {
    Swal.fire("please select role");
  }
  //   console.log(values);
  const dto = {
    username: values.username,
    password: values.password,
    role: role.value,
  };
  console.log(dto);
  //   console.log(adminStore.createAdmin)
  const res = await adminStore.createAdmin(dto);
  if (res) {
    Swal.fire(res.message || "create admin complete");
    router.push("admin-update");
  }
};
</script>

<template>
  <div>
    <Form
      v-slot="{ errors, isSubmitting }"
      :validation-schema="schema"
      class="p-8 sm:p-12 flex flex-col text-left rounded-2xl w-full mx-5 sm:mx-auto my-auto box"
      @submit="onSubmit"
    >
      <div style="height: 70px" class="mt-8">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Username</label
        >
        <Field
          placeholder="username"
          name="username"
          type="text"
          class="bg-gray-100 text-black rounded-md w-full p-2 sm:p-3 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline focus:shadow ring-offset-2 text-sm"
          :class="{ 'is-invalid': errors.username }"
        />
        <div class="text-red-500 m-2">{{ errors.username }}</div>
      </div>
      <div style="height: 70px" class="mt-2">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <Field
          placeholder="password"
          name="password"
          type="password"
          class="bg-gray-100 text-black rounded-md w-full p-2 sm:p-3 hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-outline focus:shadow ring-offset-2 text-sm"
          :class="{ 'is-invalid': errors.password }"
        />
        <div class="text-red-500 m-2">{{ errors.password }}</div>
      </div>
      <div style="height: 70px" class="mt-2">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Select an option</label
        >
        <select
          id="countries"
          v-model="role"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Choose a Role</option>
          <option value="ADMIN">Admin</option>
          <option value="ADMIN_WEB">Website Admin</option>
        </select>
      </div>
      <div class="mt-3">
        <BaseButton
          style="background-color: #ffb730"
          class="p-3 sm:p-4 text-white rounded-md w-full font-medium border-none"
          type="submit"
          label="CONFIRM"
          :disabled="loadingPost"
        />
      </div>
    </Form>
  </div>
</template>

<style scoped>
@media (min-width: 450px) {
  .box {
    width: 425px;
  }
}
</style>
