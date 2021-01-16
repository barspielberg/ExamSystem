import React, { useState } from "react";
import { match } from "react-router";

export enum QuestionType {
  singleChoiceQuestion,
  multipleSelectionQuestion,
}

interface IEditQuestionPageProps {
  match: match<{ questionId: string }>;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({ match }) => {
  const [selectedType, setSelectedType] = useState(-1);
  const [answers, setAnswers] = useState([]);

  return (
    <div>
      <form>
        <div>
          {/* #TODO replace text to field, maybe should be passed as prop or fetched*/}
          <label>Field: {match.params.questionId}</label>
        </div>
        <div>
          <label>Question Type:</label>
          {/* #TODO make select more reactive,this is temporary solution */}
          <select>
            <option value={-1}>please choose question type</option>
            <option value={0}>{QuestionType[0]}</option>
            <option value={1}>{QuestionType[1]}</option>
          </select>
        </div>
        <div>
          <label>Qustion Text:</label>
          <textarea></textarea>
        </div>
        <div>
          <label>Text below question:</label>
          <textarea></textarea>
        </div>
        <hr />
        <div>
          {/* #TODO plan how to show answers and add new answers single/muktiple choice */}
          <label>Possible Answers:</label>
        </div>
      </form>
    </div>
  );
};

export default EditQuestionPage;
