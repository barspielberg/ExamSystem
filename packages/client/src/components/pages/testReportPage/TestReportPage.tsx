import classes from "./TestReportPage.module.scss";
import { Organization, Test } from "@examsystem/common";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useParams } from "../../../hooks";
import { RootState } from "../../../redux/reducers/mainReducer";

interface ITestReportPageProps {
  organizations: Organization[] | undefined;
}

const TestReportPage: React.FC<ITestReportPageProps> = ({ organizations }) => {
  const { organizationId, fieldId } = useParams();
  const [selectedTest, setSelectedTest] = useState<Test>();

  const field = organizations
    ?.find((o) => o.id === organizationId)
    ?.fields.find((f) => f.id === fieldId);
  const tests = field?.tests;

  return (
    <div className={classes.main}>
      <h1>
        Test Report for{" "}
        <span className={classes.fieldTitle}>{field?.title}</span>
      </h1>
      <section>
        <form className={classes.inputs}>
          <div>
            <label>Select Test: </label>
            <select
              className={classes.select}
              onChange={(e) =>
                setSelectedTest(tests?.find((t) => t.id === e.target.value))
              }
            >
              {tests?.map((test) => {
                return (
                  <option key={test.id} value={test.id}>
                    {test.title}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </section>
    </div>
  );
};
const mapState2Props = (state: RootState) => ({
  organizations: state.admin.admin?.organizations,
});
const mapDispatch2Props = {};
export default connect(mapState2Props, mapDispatch2Props)(TestReportPage);
