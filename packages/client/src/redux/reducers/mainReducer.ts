import { combineReducers } from "redux";
import adminReducer from "./adminReducer";

export const rootReducer = combineReducers({
  admin: adminReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
