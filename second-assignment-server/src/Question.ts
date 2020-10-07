import express, {Request, Response} from "express";
export const questionRouter:express.Router = express.Router();

export class Question{
  public readonly id: number
  public readonly question: string

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
  }
}

export type Questions = Question[];

questionRouter.get("/question", (request:Request, response:Response)=>{
  let result:Questions = loadQuestions();
  response.status(200).send({questions:result});
});

let loadQuestions = ()=>{
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
