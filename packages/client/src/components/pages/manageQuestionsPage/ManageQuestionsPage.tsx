import { Organization } from "@examsystem/common";
import React, { useState } from "react";
import classes from "./ManageQuestionsPage.module.scss";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useParamsFull } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";
import { Table, SearchFilter } from "../../uiElements";
import TableRowsQuestions from "./TableRowQuestions";

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

  const {  organization, field } = useParamsFull(organizations);
  const [questions, setQuestions] = useState(
    organization?.questions.filter((q) => field?.questionIds.includes(q.id))
  );

  return (
    <div className={classes.Page}>
      <header>
        Available Questions for:{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </header>
      <div className={classes.filterRow}>
        Filter names by keywords:{" "}
        <SearchFilter
          originalQuestions={questions}
          onQuestionsChange={setQuestions}
          placeholder="Search..."
        />
      </div>
      <Table titles={titles}>
        <TableRowsQuestions questions={questions} tests={field?.tests || []}/>
      </Table>
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
