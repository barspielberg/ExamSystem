import { Organization } from "@examsystem/common";
import { useDebugValue } from "react";
import { useLocation } from "react-router";

export function useParams() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ids = {
    organizationId: params.get("organizationId"),
    fieldId: params.get("fieldId"),
    testId: params.get("testId"),
    questionId: params.get("questionId"),
  };

  useDebugValue(ids ?? "loading...");
  return ids;
}
export function useParamsFull(organizations?: Organization[]) {
  const ids = useParams();

  const organization = organizations?.find((o) => o.id === ids.organizationId);
  const field = organization?.fields.find((f) => f.id === ids.fieldId);
  const test = field?.tests.find((t) => t.id === ids.testId);
  const question = organization?.questions.find((q) => q.id === ids.questionId);
  const full = {
    organization,
    field,
    test,
    question,
  };
  useDebugValue(full ?? "loading...");
  return full;
}
