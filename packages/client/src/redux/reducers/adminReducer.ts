import { Admin } from "@examsystem/common";
import { adminActionTypes } from "../actions/adminActions";

type stateType = {
  admin: Admin | null;
  error: string;
  isSuccessfull: boolean;
};

const initialState: stateType = {
  admin: null,
  error: "",
  isSuccessfull: false
};

const adminReducer = (
  state = initialState,
  action: adminActionTypes
): stateType => {
  switch (action.type) {
    case "SET_ADMIN":
      return { ...state, admin: action.admin };
    case "SET_ERROR":
      return { ...state, error: action.err };
    case "SET_QUESTION_ADDED":
      return { ...state, isSuccessfull: action.isSuccessfull };
    case "RESET_QUESTION_ADDED":
      return { ...state, isSuccessfull: false };
    default:
      return state;
  }
};

export default adminReducer;
