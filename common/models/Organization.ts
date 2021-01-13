import { FieldOfStudy } from "./FieldofStudy";
import { Question } from "./Question";

export interface Organization {
  id: string;
  name: string;
  userIds: string[];
  questions: Question[];
  fields: FieldOfStudy[];
}
