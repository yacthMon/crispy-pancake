<template>
  <div class="card">
    <h5 class="card-title">Question No.{{question.id}} </h5>
    <p class="card-text">{{question.question}}</p>
    <a @click="showAnswer()" class="btn btn-primary">Answer</a>
  </div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron';
import { Options, Vue } from 'vue-class-component';
import {Question} from '../types/Question';

@Options({
  props: {
    question: Question
  }
})

export default class QuestionBox extends Vue {
  question?: Question

  created():void{
    console.log(window);
    
  }

  showAnswer():void{
    console.log("Answer triggered.");
    if(this.question){      
      // const ipcRenderer:any = window.ipcRenderer;
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('show-answer', this.question.id);
    }
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
