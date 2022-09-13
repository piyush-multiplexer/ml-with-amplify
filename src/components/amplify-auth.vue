<template>
  <div>
    <process-data></process-data>
  </div>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";

import { Amplify, Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import ProcessData from "./process-data.vue";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);
</script>
