import { Organization } from "@examsystem/common";
import { organizationActionTypes } from "../actions/organizationActions";

type stateType = {
  organization: Organization | null;
  error: string;
};

const initialState: stateType = {
  organization: null,
  error: "",
};

const organizationReducer = (
  state = initialState,
  action: organizationActionTypes
): stateType => {
  switch (action.type) {
    case "SET_ORGANIZATION":
      return { ...state, organization: action.org };
    case "SET_ERROR":
      return { ...state, error: action.err };
    default:
      return state;
  }
};

export default organizationReducer;
