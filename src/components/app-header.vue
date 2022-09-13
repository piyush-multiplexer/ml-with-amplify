<template>
  <div class="font-sans antialiased" id="app">
    <nav class="flex items-center justify-between flex-wrap bg-teal-100 p-6">
      <div class="flex items-center flex-no-shrink text-red-600 mr-6">
        <span class="font-semibold text-xl tracking-tight">Demo</span>
      </div>
      <div class="block w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="text-sm sm:flex-grow">
          <a
            href="#responsive-header"
            class="no-underline block mt-4 sm:inline-block sm:mt-0 text-teal-lighter hover:text-white mr-4"
          >
            Docs
          </a>
        </div>
        <div>
          <button @click="signOut"
            class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-red border-white hover:border-transparent hover:text-teal hover:bg-white mt-4 sm:mt-0"
          >
            Log Out
        </button>
        </div>
      </div>
    </nav>
  </div>
</template>
<script setup>
import { defineProps, ref } from 'vue';
const props = defineProps(['signOut'])
const signOut = ref(props.signOut)
</script>