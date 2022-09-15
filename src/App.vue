<template>
  <authenticator :form-fields="formFields">
    <template v-slot="{ user, signOut }">
      <template v-if="user">
        <AppHeader :user="user" :sign-out="signOut"></AppHeader>
        <router-view class="scrollbar" :user="user"></router-view>
      </template>
    </template>
  </authenticator>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import AppHeader from "./components/app-header.vue";

Amplify.configure(awsconfig);
Auth.configure(awsconfig);

const formFields = {
  signIn: {
    username: {
      labelHidden: true,
      placeholder: "Enter your username",
      isRequired: true,
      label: "",
    },
  },
  signUp: {
    username: {
      labelHidden: true,
      placeholder: "Create username",
      isRequired: true,
      label: "",
    },
    email: {
      labelHidden: true,
      placeholder: "Enter Your Email Here",
      isRequired: true,
      label: "",
    },
  },
  resetPassword: {
    username: {
      labelHidden: true,
      placeholder: "Enter your username",
      isRequired: true,
      label: "",
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
