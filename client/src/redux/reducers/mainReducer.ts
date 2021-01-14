import { combineReducers } from "redux";
import organizationReducer from "./organizationReducer";

export const rootReducer = combineReducers({
  organization: organizationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
