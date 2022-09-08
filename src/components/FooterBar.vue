<script setup>
import { containerMaxW } from "@/config.js";
import BaseLevel from "@/components/BaseLevel.vue";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b
          >&copy;{{ year }},
          <a href="https://dmr.co.th" target="_blank">dmr.co.th</a></b
        >
        <slot />
      </div>
      <div class="md:py-2">
        <a href="https://dmr.co.th"> </a>
      </div>
    </BaseLevel>
  </footer>
</template>
