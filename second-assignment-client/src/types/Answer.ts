export class Answer{
  public readonly id: number
  public readonly answer: string

  constructor(id: number, answer: string) {
    this.id = id;
    this.answer = answer;
  }
}

export type Answers = Answer[];