import express, {Request, Response} from "express";
export const answerRouter:express.Router = express.Router();

export class Answer{
  public readonly id: number
  public readonly answer: string

  constructor(id: number, answer: string) {
    this.id = id;
    this.answer = answer;
  }
}

answerRouter.get("/answer/:id", (request:Request, response:Response)=>{
  const id: number = parseInt(request.params.id);
  let answer:Answer = getAnswer(id);
  if(answer===null){
    response.status(404).send("Answer id not found.");
  }else{
    response.status(200).send({answer});
  }
});

let getAnswer = (questionId: number): Answer | null => {
  let answerData:any = require('../answer.json');
  for(let i=0;i<answerData.data.length;i++){
    if(answerData.data[i].id == questionId) {
      return answerData.data[i];
    }
  }
  return null;
}
 