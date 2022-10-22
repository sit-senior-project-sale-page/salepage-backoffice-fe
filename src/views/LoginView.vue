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
      text: error,
      icon: "error",
    });
    setErrors({ apiError: error });
  });
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{}" bg="purplePink">
      <Form
        v-slot="{ errors, isSubmitting }"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <CardBox>
          <FormField>
            <label>Username</label>
            <Field
              placeholder="username"
              name="username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.username }"
            />
            <div class="text-red-500">{{ errors.username }}</div>
          </FormField>

          <FormField>
            <label>Password</label>
            <Field
              placeholder="password"
              name="password"
              type="password"
              class="form-control"
              :class="{ 'is-invalid': errors.password }"
            />
            <div class="text-red-500">{{ errors.password }}</div>
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Login"
                :disabled="isSubmitting"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </Form>
    </SectionFullScreen>
  </LayoutGuest>
</template>
