<template>
  <div class="font-mono antialiased">
    <nav class="flex items-center justify-between flex-wrap bg-primary p-5">
      <div class="flex items-center text-secondary">
        <span class="font-bold text-2xl tracking-tight">Demo</span>
      </div>
      <div class="block w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="flex-grow"></div>
        <div class="font-semibold text-secondary mr-3">
          {{ user.username }}
        </div>
        <div>
          <button
            @click="signOut"
            class="no-underline inline-block text-sm px-4 py-2 leading-none tracking-wide border rounded font-medium text-secondary border-tertary mt-4 sm:mt-0"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
const props = defineProps(["user", "signOut"]);
const signOut = ref(props.signOut);
const user = ref(props.user);
</script>
