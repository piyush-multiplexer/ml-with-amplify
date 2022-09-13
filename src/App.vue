<template>
  <authenticator :form-fields="formFields">
    <template v-slot="{ user, signOut }">
      <template v-if="user">
        <router-view :user="user"></router-view>
        <h1>Hello {{ user.username }}!</h1>
        <button @click="signOut">Sign Out</button>
      </template>
    </template>
  </authenticator>
</template>

<script setup>
import "@aws-amplify/ui-vue/styles.css";
import { Amplify, Auth } from "aws-amplify";
import awsconfig from "./aws-exports";

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
  color: #2c3e50;
  margin-top: 60px;
}
.amplify-button[data-variation="link"]:hover {
  background: none;
  text-decoration: underline;
}
</style>
