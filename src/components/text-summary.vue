<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <button @click="getSummary">Get</button>
  </div>
</template>
<script setup>
import { processDoc } from "../utils/generate-summary";
const doc = "hello";
function getSummary() {
  console.log(processDoc(doc));
}
</script>
