<template>
  <div class="font-sans d-flex py-5 px-2">
    <div class="flex items-center mt-5 h-96">
      <div class="flex-shrink input-section w-full h-full">
        <div class="h-full">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-tertary"
            >Input Document</label
          >
          <textarea
            id="message"
            v-model="doc"
            rows="4"
            class="scrollbar block p-2.5 h-full w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter doc/text to get summary."
          ></textarea>
        </div>
      </div>
      <div class="mx-3 w-100">
        <div class="w-3/2">
          <label for="sentenceLength" class="text-tertary mb-2"
            >Sentence Length</label
          >
          <input
            placeholder="Length"
            v-model="sentenceLength"
            id="sentenceLength"
            style="width: 100px"
          />
          <button
            @click="getSummary"
            :disabled="loading.value"
            type="button"
            class="hover:animate-bounce inline-block px-5 py-2 mt-3 bg-tertary text-primary font-medium text-md leading-wide rounded shadow-md inline-flex items-center"
          >
            {{ loading ? "Loading.." : "GENERATE" }}
            <svg
              v-if="loading"
              role="status"
              class="inline pl-3 w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="flex-shrink w-full h-full">
        <label
          for="message"
          class="block mb-2 text-sm font-medium text-tertary"
        >
          Document Summary
        </label>
        <p
          id="summary-section"
          class="bg-white mt-2 text-justify rounded border border-tertary p-3 h-full"
        ></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "@vue/runtime-core";
import { API } from "aws-amplify";

let doc = ref(
  "Computer programming is the process of performing a particular computation (or more generally, accomplishing a specific computing result), usually by designing and building an executable computer program. Programming involves tasks such as analysis, generating algorithms, profiling algorithms' accuracy and resource consumption, and the implementation of algorithms (usually in a chosen programming language, commonly referred to as coding). The source code of a program is written in one or more languages that are intelligible to programmers, rather than machine code, which is directly executed by the central processing unit. The purpose of programming is to find a sequence of instructions that will automate the performance of a task (which can be as complex as an operating system) on a computer, often for solving a given problem. Proficient programming thus usually requires expertise in several different subjects, including knowledge of the application domain, specialized algorithms, and formal logic. Tasks accompanying and related to programming include testing, debugging, source code maintenance, implementation of build systems, and management of derived artifacts, such as the machine code of computer programs. These might be considered part of the programming process, but often the term software development is used for this larger process with the term programming, implementation, or coding reserved for the actual writing of code. Software engineering combines engineering techniques with software development practices. Reverse engineering is a related process used by designers, analysts, and programmers to understand and re-create/re-implement."
);
let sentenceLength = ref(35);
let loading = ref(false);

async function getSummary() {
  loading.value = true;
  const summary = await API.post("expressapi", "/nlp", {
    body: {
      sentLength: sentenceLength.value,
      doc: doc.value,
    },
  });
  document.getElementById("summary-section").innerText = summary.data.data;
  loading.value = false;
}
</script>
