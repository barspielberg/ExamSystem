import { Alignment, Language, QuestionType } from "../enums";
import { Answer } from "./Answer";

export interface TakenTest {
  id: string;
  testId: string;
  lang: Language;
  title: string;
  introduction: string;
  student: Student;
  questions: AnsweredQuestion[];
  dateSubmitted: string;
  submited?: boolean;
}

export interface AnsweredQuestion {
  oringinalQuestionId: string;
  type: QuestionType;
  mainTitle: string;
  secondaryTitle?: string;
  possibleAnswers: Answer[];
  alignment: Alignment;
}

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
}
