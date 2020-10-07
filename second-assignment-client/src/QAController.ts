import axios, { AxiosResponse } from 'axios';
import { Question, Questions } from './types/Question';
import { Answer, Answers } from './types/Answer';
const apiPath = "http://localhost:3000";

export function getQuestionList(): Questions {
  let questionList: Questions = [];
  let questionData: any = require('../question.json');
  for (let index in questionData.data) {
    try {
      let question: Question = questionData.data[index] as Question;
      questionList.push(question);
    } catch (error) {
      console.log("Invalid question data structure.");
    }
  }
  return questionList;
}

export function getAnswer(questionId: number): Answer | null {
  let answerData:any = require('../answer.json');
  for(let i=0;i<answerData.data.length;i++){
    if(answerData.data[i].id == questionId) {
      return answerData.data[i];
    }
  }
  return null;
}

export async function loadQuestionList(): Promise<Questions> {
  return axios.get(`${apiPath}/question`).then((response:AxiosResponse)=>{
  let questionList: Questions = [];
  if(response.status === 200){
      questionList = response.data.questions;
      console.log("Question list from backend server.");
      return questionList;
    } else {
      console.log("Question list from offline application.");
      return getQuestionList();
    }
  }).catch((err:Error)=>{
    console.log("Can't connect to server by following error");
    console.log(err.message);
    console.log("Switch to offline application data.");
    return getQuestionList();
  });
}

export async function loadAnswer(questionId:number): Promise<Answer> {
  return axios.get(`${apiPath}/answer/${questionId}`).then((response:AxiosResponse)=>{
  if(response.status === 200){
      console.log("Answer from backend server.");
      return response.data.answer;
    } else {
      console.log("Answer on server not found");
      return getAnswer(questionId);
    }
  }).catch((err:Error)=>{
    console.log("Can't connect to server by following error");
    console.log(err.message);
    console.log("Switch to offline application data.");
    return getAnswer(questionId);
  });
}