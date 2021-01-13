import { FieldOfStudy } from "./FieldofStudy";
import { Question } from "./Question";

export interface Organization {
  id: string;
  name: string;
  questions: Question[];
  fields: FieldOfStudy[];
}
