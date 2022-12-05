<script setup>
import { ref } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/Card/CardBox.vue";

const userSwitchVal = ref(false);

const props = defineProps({
  user: Object,
});

console.log(props.user);
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <h1 class="text-2xl">username : {{ props.user.username }}</h1>
        <p class="text-center">
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
