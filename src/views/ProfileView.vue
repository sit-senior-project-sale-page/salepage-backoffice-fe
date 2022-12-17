<script setup>
import { reactive } from "vue";
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiCheckCircle,
  mdiFormTextboxPassword,
} from "@mdi/js";
import SectionMain from "@/components/Section/SectionMain.vue";
import CardBox from "@/components/Card/CardBox.vue";
import BaseDivider from "@/components/BaseDivider.vue";
import FormField from "@/components/Form/FormField.vue";
import FormControl from "@/components/Form/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import UserCard from "@/components/User/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/Section/SectionTitleLineWithButton.vue";
import NotificationBar from "@/components/NotificationBar.vue";

import { useUsersStore } from "@/stores/users.js";
import { useAuthStore } from "@/stores/auth.js";
import { storeToRefs } from "pinia";
import Swal from "sweetalert2";

const userStore = useUsersStore();
// const authStore = useAuthStore();

const { user, loading, error, statusError, statusSuccess } = storeToRefs(
  useUsersStore()
);

const { type } = storeToRefs(useAuthStore());
console.log("🚀 ~ file: ProfileView.vue:35 ~ type", type);

const passwordForm = reactive({
  password_current: "",
  password: "",
  password_confirmation: "",
});

userStore.profile();

const submitProfile = async () => {
  await userStore.updateprofile(user.value);
  await userStore.profile();
};

const submitPass = async () => {
  if (passwordForm.password !== passwordForm.password_confirmation) {
    Swal.fire({
      title: "Error",
      text: "Please confirm password correctly",
      icon: "warning",
    });
  }
  await userStore.updatepassword({
    oldPassword: passwordForm.password_current,
    newPassword: passwordForm.password,
  });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard :user="user" class="mb-6" />

      <NotificationBar
        v-if="statusSuccess"
        color="success"
        :icon="mdiCheckCircle"
      >
        <b>Success</b>.
      </NotificationBar>
      <NotificationBar v-if="statusError" color="danger" :icon="mdiCheckCircle">
        <b>{{ error.message }}</b
        >.
      </NotificationBar>

      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-6"
        :class="type !== 1 ? `lg:grid-cols-1` : ``"
      >
        <CardBox v-if="type !== '1'" is-form @submit.prevent="submitProfile">
          <FormField label="Firstname">
            <FormControl
              v-model="user.firstname"
              :icon="mdiAccount"
              name="firstname"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="Lastname">
            <FormControl
              v-model="user.lastname"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
            />
          </FormField>
          <FormField label="E-mail">
            <FormControl
              v-model="user.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Link To Page">
            <FormControl
              v-model="user.email"
              :icon="mdiMail"
              type="text"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Payment Bank Account Name">
            <FormControl
              v-model="user.paymentBankAccountName"
              :icon="mdiMail"
              type="text"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Payment Bank Account Number">
            <FormControl
              v-model="user.paymentBankAccountNumber"
              :icon="mdiMail"
              type="text"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <FormField label="Payment Bank Name">
            <FormControl
              v-model="user.paymentBankName"
              :icon="mdiMail"
              type="text"
              name="email"
              required
              autocomplete="email"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                color="info"
                type="submit"
                label="Save Profile"
                :disabled="loading"
              />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPass">
          <FormField
            label="Current password"
            help="Required. Your current password"
          >
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <FormField
            label="Confirm password"
            help="Required. New password one more time"
          >
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Submit"
                :disabled="loading"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
