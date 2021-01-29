import { Alignment, QuestionType } from "../enums";

export interface TakenTest {
  id: string;
  testId: string;
  student: Student;
  questions: AnsweredQuestion[];
  dateSubmitted: string;
}

export interface AnsweredQuestion {
  oringinalQuestionId: string;
  type: QuestionType;
  mainTitle: string;
  secondaryTitle?: string;
  answers: string[];
  alignment: Alignment;
}

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
}
