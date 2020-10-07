<template>
  <div class="card">
    <h5 class="card-title">Answer of question No.{{answer.id}} is</h5>
    <p class="card-text">{{answer.answer}}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import {Answer} from '../types/Answer';
@Options({
  props: {
    questionId: Number
  }
})

export default class AnswerComponent extends Vue {
  answer:Answer = {id:0, answer:"None"};

  created () {
    const { ipcRenderer } = window.require('electron');
    ipcRenderer.on("load-answer", (event:any, args:Answer)=>{
      console.log("Receive answer data!");
      this.answer = args;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div{
  text-align: left;
  padding: 20px;
  margin: 20px;
}
</style>
