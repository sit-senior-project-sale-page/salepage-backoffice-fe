<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import { mdiCheckDecagram } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/User/UserAvatarCurrentUser.vue";
import CardBox from "@/components/Card/CardBox.vue";
import PillTag from "@/components/PillTag/PillTag.vue";

const userSwitchVal = ref(false);

const props = defineProps({
  user: Object,
});

console.log(props.user);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">
          {{ props.user.username }}
        </h1>
        <p>
          เข้าสู่ระบบล่าสุด
          <b>{{
            new Date(props.user.lastLogin).toLocaleDateString("th-TH", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })
          }}</b>
          from
          <b>{{ props.user.lastLoginIp }}</b>
        </p>
      </div>
    </BaseLevel>
  </CardBox>
</template>
