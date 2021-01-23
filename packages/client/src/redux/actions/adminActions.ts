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
      type: "SET_QUESTION_ADDED";
      isSuccessfull: boolean;
    }
  | {
      type: "RESET_QUESTION_ADDED";
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
  const admin = await DataService.getAdmin(email, password);
  if (admin) dispatch(setAdmin(admin));
  else dispatch(setError("Error occured"));
};

export const addQuestion = (
  question: Question,
  orgId: string
): AppThunk => async (dispatch) => {
  const quest = await DataService.addQuestion(question, orgId);
  if (quest) dispatch(setQuestionAdded(true));
  else dispatch(setError("Error occured"));
};

export const resetAddQuestion = (): AppThunk => async (dispatch) => {
  dispatch(resetQuestionAdded());
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

const setError = (err: string): adminActionTypes => ({
  type: "SET_ERROR",
  err,
});

const setQuestionAdded = (isSuccessfull: boolean): adminActionTypes => ({
  type: "SET_QUESTION_ADDED",
  isSuccessfull,
});

const resetQuestionAdded = (): adminActionTypes => ({
  type: "RESET_QUESTION_ADDED",
  isSuccessfull: false,
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
