<template>
  <div>
    <text-summary></text-summary>
  </div>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import TextSummary from "./text-summary.vue";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
</script>
