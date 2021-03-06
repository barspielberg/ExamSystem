import { Admin, Question, Test } from "@examsystem/common";
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
    case "ADD_QUESTION":
      return createQuestion(state, action.orgId, action.fieldsIds, action.question);
    case "UPDATE_QUESTION":
      return updateQuestion(state, action.orgId, action.fieldsIds, action.question);
    case "UPDATE_TEST":
      return updateTest(state, action.orgId, action.fieldId, action.test);
    case "ADD_TEST":
      return addTest(state, action.orgId, action.fieldId, action.test);
    default:
      return state;
  }
};

export default adminReducer;

const createQuestion = (
  state: stateType,
  orgId: string,
  fieldsIds: string[],
  question: Question
): stateType => {
  if (state.admin) {
    return {
      ...state,
      admin: {
        ...state.admin,
        organizations: state.admin.organizations.map((o) => o.id === orgId ? {
          ...o,
          questions: [...o.questions, question],
          fields: o.fields.map(f => fieldsIds.includes(f.id) ? {
            ...f,
            questionIds: [...f.questionIds, question.id]
          } : f)
        } : o)
      }
    };
  }
  return state;
};

const updateQuestion = (
  state: stateType,
  orgId: string,
  fieldsIds: string[],
  question: Question
): stateType => {
  if (state.admin) {
    return {
      ...state,
      admin: {
        ...state.admin,
        organizations: state.admin.organizations.map((o) => o.id === orgId ? {
          ...o,
          questions: o.questions.map(q => q.id === question.id ? question : q),
          fields: o.fields.map(f => fieldsIds.includes(f.id) ? {
            ...f,
            questionIds: f.questionIds.includes(question.id) ? f.questionIds : [...f.questionIds, question.id]
          } : {
              ...f,
              questionIds: f.questionIds.filter(q => q !== question.id)
            })
        } : o)
      }
    };
  }
  return state;
};


//🙈
const updateTest = (
  state: stateType,
  orgId: string,
  fieldId: string,
  test: Test
): stateType => {
  if (state.admin) {
    return {
      ...state,
      admin: {
        ...state.admin,
        organizations: state.admin.organizations.map((o) =>
          o.id === orgId
            ? {
              ...o,
              fields: o.fields.map((f) =>
                f.id === fieldId
                  ? {
                    ...f,
                    tests: f.tests.map((t) =>
                      t.id === test.id ? test : t
                    ),
                  }
                  : f
              ),
            }
            : o
        ),
      },
    };
  }
  return state;
};
//🙈
const addTest = (
  state: stateType,
  orgId: string,
  fieldId: string,
  test: Test
): stateType => {
  if (state.admin) {
    return {
      ...state,
      admin: {
        ...state.admin,
        organizations: state.admin.organizations.map((o) =>
          o.id === orgId
            ? {
              ...o,
              fields: o.fields.map((f) =>
                f.id === fieldId
                  ? {
                    ...f,
                    tests: [...f.tests, test],
                  }
                  : f
              ),
            }
            : o
        ),
      },
    };
  }
  return state;
};
