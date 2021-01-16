import { Test } from "./Test";

export interface FieldOfStudy {
  id: string;
  title: string;
  questionIds: string[];
  tests: Test[];
}
