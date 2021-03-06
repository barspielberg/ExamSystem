import { Language } from "../enums";
import { EmailMessage } from "./EmailMessage";

export interface Test {
  id: string;
  lastUpdate: string;
  version: number;
  lang: Language;
  title: string;
  introduction: string;
  testerEmail: string;
  passingGrade: number;
  reviewAnswers: boolean;
  successMessage: string;
  failMessage: string;
  successEmail?: EmailMessage;
  failEmail?: EmailMessage;
  questionIds: string[];
}
