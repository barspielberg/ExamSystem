import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { Admin, Organization } from "../../../../common/models";
import DataService from "../../services/dataService";
import { RootState } from "../reducers/mainReducer";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type organizationActionTypes =
  | {
      type: "SET_ORGANIZATION";
      org: Organization | null;
    }
  | {
      type: "SET_ERROR";
      err: string;
    };

export const getOrganization = (email: string, password: string): AppThunk => async (dispatch) => {
  const org = await DataService.getOrganization(email,password);
  if (org) dispatch(setOrganization(org));
  else dispatch(setError("error title"));
};

const setOrganization = (org: Organization): organizationActionTypes => ({
  type: "SET_ORGANIZATION",
  org,
});

const setError = (err: string): organizationActionTypes => ({
  type: "SET_ERROR",
  err,
});
