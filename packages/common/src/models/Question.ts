import { QuestionType, Alignment } from "../enums";
import { Answer } from "./Answer";

export interface Question {
  id: string;
  type: QuestionType;
  mainTitle: string;
  secondaryTitle?: string;
  possibleAnswers: Answer[];
  alignment: Alignment;
  tags: string[];
  lastUpdate: string;
}
