import React from "react";
import { match, useHistory } from "react-router";
import { useParams } from "../../../hooks";

interface IManageQuestionsPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Michael
const ManageQuestionsPage: React.FC<IManageQuestionsPageProps> = ({
  match,
}) => {
  const history = useHistory();
  const organizationId = useParams().organizationId;

  return (
    <div>
      ManageQuestionsPage Worked! id: {match.params.fieldId}
      <div>table of questions for this filed</div>
      <div>
        <button onClick={() => history.push({pathname: "/EditQuestion/addNew/", search: `?orgId=${organizationId}`})}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default ManageQuestionsPage;
