import React, { useState } from "react";
import { match, useHistory } from "react-router";
import { Answer, QuestionType } from "@examsystem/common";
import { Alignment } from "@examsystem/common";

interface IEditQuestionPageProps {
  match: match<{ questionId: string }>;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({ match }) => {
  const history = useHistory();
  const [selectedType, setSelectedType] = useState<QuestionType>();
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment>(0);
  const [tags, setTags] = useState("");
  const defaultAnswers: Answer[] = [
    {
      id: "0",
      content: "first answer",
      correct: false,
    },
    {
      id: "1",
      content: "second answer",
      correct: true,
    },
    {
      id: "2",
      content: "third answer",
      correct: false,
    },
    {
      id: "3",
      content: "fourth answer",
      correct: false,
    },
  ];
  const [answers, setAnswers] = useState(defaultAnswers);

  const updateContent = (index: any) => (e: any) => {
    let newArr = [...answers];
    newArr[index].content = e.target.value;
    setAnswers(newArr);
  };

  const removeAnswer = (id: string) => {
    let newArr = answers.filter((ans) => ans.id !== id);
    setAnswers(newArr);
  };

  const addNewAnswer = () => {
    const newAnswer: Answer = {
      id: answers.length.toString(),
      content: "new answer",
      correct: false,
    };
    setAnswers([...answers, newAnswer]);
  };

  const setCorrectAnswer = (id: string) => {
    setAnswers(answers.map((ans) => ({ ...ans, correct: ans.id === id })));
  };

  return (
    <div>
      <form>
        <div>
          {/* #TODO replace text to field, maybe should be passed as prop or fetched*/}
          <label>Field: {match.params.questionId}</label>
        </div>
        <div>
          <label>Question Type:</label>
          <select>
            <option value={-1}>please choose question type</option>
            <option value={selectedType} onSelect={() => setSelectedType(0)}>
              {QuestionType[0]}
            </option>
            <option value={selectedType} onSelect={() => setSelectedType(1)}>
              {QuestionType[1]}
            </option>
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
          {answers.map((ans, index) => {
            return (
              <div key={index}>
                <button
                  type="button"
                  onClick={() => {
                    removeAnswer(ans.id);
                  }}
                >
                  X
                </button>
                <input
                  value={ans.content}
                  onChange={(e) => updateContent(index)(e)}
                />
                <input
                  type="radio"
                  name="WhoIsCorrect"
                  checked={ans.correct}
                  onChange={() => setCorrectAnswer(ans.id)}
                />
              </div>
            );
          })}
          <button type="button" onClick={addNewAnswer}>
            Add an Answer
          </button>
        </div>
        <div>
          <label>Answers Layout:</label>
          <input
            type="radio"
            checked={selectedAlignment === 0}
            name="alignment"
            onChange={() => setSelectedAlignment(0)}
          />
          <label>Horizontal</label>
          <input
            type="radio"
            checked={selectedAlignment === 1}
            name="alignment"
            onChange={() => setSelectedAlignment(1)}
          />
          <label>Vertical</label>
        </div>
        <hr />
        <div>
          <label>Tags: </label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>
        <div>
          <button type="button" onClick={history.goBack}>
            Back
          </button>
          <button type="button">Show</button>
          <button type="button">Save</button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestionPage;
