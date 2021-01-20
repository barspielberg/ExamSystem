import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Admin, Organization, Question } from "@examsystem/common";
import DataService from "../../services/dataService";
import { RootState } from "../reducers/mainReducer";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type adminActionTypes =
  | {
      type: "SET_ADMIN";
      admin: Admin | null;
    }
  | {
      type: "SET_ERROR";
      err: string;
    }
  | {
      type: "SET_QUESTION_ADDED";
      isSuccessfull: boolean;
    };

export const getAdmin = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  const admin = await DataService.getAdmin(email, password);
  if (admin) dispatch(setAdmin(admin));
  else dispatch(setError("Error occured"));
};

export const addQuestion = (question: Question,orgId:string): AppThunk => async (
  dispatch
) => {
  const quest = await DataService.addQuestion(question,orgId);
  if (quest) dispatch(setQuestionAdded(true));
  else dispatch(setError("Error occured"));
};

const setAdmin = (admin: Admin): adminActionTypes => ({
  type: "SET_ADMIN",
  admin,
});

const setError = (err: string): adminActionTypes => ({
  type: "SET_ERROR",
  err,
});

const setQuestionAdded = (isSuccessfull: boolean): adminActionTypes => ({
  type: "SET_QUESTION_ADDED",
  isSuccessfull,
});
