import { Question } from "../../../../common/models";

export type questionsActionTypes =
  | {
      type: "ADD_TO_QUESTIONS";
      qus: Question;
    }
  | {
      type: "REMOVE_FROM_QUESTIONS";
      qus: Question;
    }
  | {
      type: "CLEAR_QUESTIONS";
    };

export const addToQuestions = (qus: Question): questionsActionTypes => ({
  type: "ADD_TO_QUESTIONS",
  qus,
});

export const removeFromQuestions = (qus: Question): questionsActionTypes => ({
  type: "REMOVE_FROM_QUESTIONS",
  qus,
});

export const clearQuestions = (): questionsActionTypes => ({
  type: "CLEAR_QUESTIONS",
});
