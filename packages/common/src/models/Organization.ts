import { FieldOfStudy } from "./FieldOfStudy";
import { Question } from "./Question";

export interface Organization {
  id: string;
  name: string;
  adminIds: string[];
  questions: Question[];
  fields: FieldOfStudy[];
}
