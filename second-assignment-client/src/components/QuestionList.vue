<template>
  <div>
    <ul id="question-list">
      <ui v-for="question in questionList" :key="question.id">
        <QuestionBox v-bind:question="question" />
      </ui>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Question , Questions} from '../types/Question';
import QuestionBox from './QuestionBox.vue';

@Options({
  components: {
    QuestionBox,
  },
})
export default class QuestionList extends Vue {
  questionList:Questions = [];
  created() : void{
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on("load-questions", (event:any, args:any)=>{
      console.log("Receive question list");
      this.questionList = args;
    });
  }
}
</script>

<style>

</style>
