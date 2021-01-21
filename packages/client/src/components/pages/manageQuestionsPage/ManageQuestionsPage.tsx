import { Organization } from "@examsystem/common";
import React, { useState } from "react";
import { connect } from "react-redux";
import { match, useHistory } from "react-router";
import { useParams, useParamsFull } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Table } from "../../uiElements";

interface IManageQuestionsPageProps {
  organizations?: Organization[];
}

const titles = [
  "ID",
  "Question text and Tags",
  "Last Update",
  "Question Type",
  "Num of Tests",
  "",
];

//TODO by Michael
const ManageQuestionsPage: React.FC<IManageQuestionsPageProps> = ({
  organizations,
}) => {
  const history = useHistory();

  const { question, organization, field } = useParamsFull(organizations);
  const [questions, setQuestions] = useState(field?.tests);

  return (
    <div>
      <div>table of questions for this filed</div>
      <Table titles={titles}></Table>
      <div>
        <button
          onClick={() =>
            history.push({
              pathname: "/EditQuestion/addNew/",
              search: `?orgId=${organization?.id}`,
            })
          }
        >
          Add Question
        </button>
      </div>
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
export default connect(mapState2Props)(ManageQuestionsPage);
