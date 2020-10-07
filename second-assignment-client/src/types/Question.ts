export class Question{
  public readonly id: number
  public readonly question: string

  constructor(id: number, question: string) {
    this.id = id;
    this.question = question;
  }
}

export type Questions = Question[];