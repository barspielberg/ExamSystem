import { Admin } from "@examsystem/common";
import { adminActionTypes } from "../actions/adminActions";

type stateType = {
  admin: Admin | null;
  error: string;
};

const initialState: stateType = {
  admin: null,
  error: "",
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
    default:
      return state;
  }
};

export default adminReducer;
