import React from "react";
import { match, useHistory } from "react-router";

interface IManageQuestionsPageProps {
  match: match<{ fieldId: string }>;
}
//TODO by Michael
const ManageQuestionsPage: React.FC<IManageQuestionsPageProps> = ({
  match,
}) => {
  const history = useHistory();
  return (
    <div>
      ManageQuestionsPage Worked! id: {match.params.fieldId}
      <div>table of questions for this filed</div>
      <div>
        <button onClick={() => history.push("/EditQuestion/addNew")}>
          Add Question
        </button>
      </div>
    </div>
  );
};

export default ManageQuestionsPage;
