import { Language } from "../enums";
import { Email } from "./Email";

export interface Test {
  id: string;
  lang: Language;
  title: string;
  introduction: string;
  testerEmail: string;
  passingGrade: number;
  reviewAnswers: boolean;
  successMessage: string;
  failMessage: string;
  successEmail?: Email;
  failEmail?: Email;
  questionIds: string[];
}
