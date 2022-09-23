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
          <input placeholder="Length" v-model="sentenceLength" id="sentenceLength"  style="width: 100px"/>
          <button
            @click="getSummary"
            type="button"
            class="hover:animate-bounce inline-block px-5 py-2 mt-3 bg-tertary text-primary font-medium text-md leading-wide rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
          >
            GENERATE
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
let sentenceLength = ref(35)
async function getSummary() {
  const summary = await API.post("expressapi", "/nlp", {
    body: {
      sentLength: sentenceLength.value,
      doc: doc.value,
    },
  });
  document.getElementById("summary-section").innerText = summary.data.data;
  console.log();
  // write for loop to print * 5
}
</script>
