import React, { useState } from "react";
import { match } from "react-router";
import { QuestionType } from '../../../../../common/enums/index';

interface IEditQuestionPageProps {
  match: match<{ questionId: string }>;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({ match }) => {
  const [selectedType, setSelectedType] = useState(QuestionType.singleChoiceQuestion);

  return <div>
    <form>
      <div>
        {/* #TODO replace text to field, maybe should be passed as prop or fetched*/}
        <label>Field: {match.params.questionId}</label>
      </div>
      <div>
        <label>Question Type:</label>
        {/* <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value={QuestionType[0]}>please choose type</option>
          </select> */}
      </div>
    </form>
  </div>;
};

export default EditQuestionPage;
