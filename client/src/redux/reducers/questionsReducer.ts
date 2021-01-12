import { questionsActionTypes } from "../actions/questionsActions";
import { Question } from "../../../../common/models";

const initialState: Question[] = [];

const questionsReducer = (
  state = initialState,
  action: questionsActionTypes
): Question[] => {
  switch (action.type) {
    default:
      return state;
  }
};

export default questionsReducer;
