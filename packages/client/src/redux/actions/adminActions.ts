import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Admin, Question, Test } from "@examsystem/common";
import DataService from "../../services/dataService";
import { RootState } from "../reducers/mainReducer";
import dataService from "../../services/dataService";

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
      type: "QUESTION_ADDED";
      isSuccessfull: boolean;
    }
  | {
      type: "QUESTION_UPDATED";
      isSuccessfull: boolean;
    }
  | {
    type: "UPDATE_TEST";
    orgId: string;
    fieldId: string;
    test: Test;
  };


export const getAdmin = (email: string, password: string): AppThunk => async (
  dispatch
) => {
  const res = await DataService.getAdmin(email, password);
  if (typeof res === "string") dispatch(setError(res));
  else dispatch(setAdmin(res));
};

export const addQuestion = (
  question: Question,
  orgId: string,
  fieldsIds: string[]
): AppThunk => async (dispatch) => {
  const res = await DataService.addQuestion(question, orgId, fieldsIds);
  if (typeof res === "string") dispatch(setError(res));
  else dispatch(questionAdded(true));
};

export const putQuestion = (
  question: Question,
  orgId: string,
  fieldsIds: string[]
): AppThunk => async (dispatch) => {
  const res = await DataService.updateQuestion(question, orgId, fieldsIds);
  if (typeof res === "string") dispatch(setError(res));
  else dispatch(questionAdded(true));
};

export const putTest = (
  orgId: string,
  fieldId: string,
  test: Test
): AppThunk => async (dispatch) => {
  const res = await dataService.putTest(orgId, fieldId, test);
  if (typeof res === "string") {
    dispatch(setError(res));
  } else {
    dispatch(updateTest(orgId, fieldId, res));
  }
};

const setAdmin = (admin: Admin): adminActionTypes => ({
  type: "SET_ADMIN",
  admin,
});

export const setError = (err: string): adminActionTypes => ({
  type: "SET_ERROR",
  err,
});

export const questionAdded = (isSuccessfull: boolean): adminActionTypes => ({
  type: "QUESTION_ADDED",
  isSuccessfull,
});

const updateTest = (
  orgId: string,
  fieldId: string,
  test: Test
): adminActionTypes => ({
  type: "UPDATE_TEST",
  orgId,
  fieldId,
  test,
});
