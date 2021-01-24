import classes from "./EditQUestionPage.module.scss";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  Answer,
  QuestionType,
  Alignment,
  Question,
  Admin,
} from "@examsystem/common";
import { RootState } from "../../../redux/reducers/mainReducer";
import { connect } from "react-redux";
import {
  addQuestion,
  questionAdded,
} from "../../../redux/actions/adminActions";
import { Button, PopupMessage } from "../../uiElements";

interface IEditQuestionPageProps {
  isSuccessfull: boolean;
  addQuestion: (question: Question, orgId: string, fieldsIds: string[]) => void;
  questionAdded: any;
  admin: Admin | null;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({
  addQuestion,
  isSuccessfull,
  questionAdded,
  admin,
}) => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const organizationId = params.get("orgId") || "";
  const fields = admin?.organizations.find((o) => o.id === organizationId)
    ?.fields;
  const [selectedFields, setSelectedFields] = useState<string[] | any[]>([]);
  const [selectedType, setSelectedType] = useState<QuestionType>(0);
  const [selectedAlignment, setSelectedAlignment] = useState<Alignment>(0);
  const [tags, setTags] = useState("");
  const [mainTitle, setMainTitle] = useState("");
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    if (isSuccessfull) history.goBack();
    questionAdded(false);
  }, [isSuccessfull, history]);

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
    selectedType === QuestionType.singleChoiceQuestion
      ? setAnswers(answers.map((ans) => ({ ...ans, correct: ans.id === id })))
      : setAnswers(
          answers.map((ans) => ({
            ...ans,
            correct: ans.id === id ? !ans.correct : ans.correct,
          }))
        );
  };

  const setFields = (id: string) => {
    let newSelecteffields;
    if (selectedFields.includes(id)) {
      newSelecteffields = selectedFields.filter((f) => f !== id);
      setSelectedFields(newSelecteffields);
    } else {
      setSelectedFields([...selectedFields, id]);
    }
  };

  const submitForm = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    addQuestion(
      {
        id: "",
        mainTitle,
        secondaryTitle,
        alignment: selectedAlignment,
        type: selectedType,
        possibleAnswers: answers,
        tags: tags.split(","),
        lastUpdate: new Date().toLocaleDateString(),
      },
      organizationId,
      ["1"]
    );
  };

  return (
    <div className={classes.page}>
      <header>Add new Question</header>
      <form className={classes.inputs}>
        <div>
          <label>Question Fields:</label>
          {fields?.map((field, index) => {
            return (
              <div key={index}>
                <label>{field.title}</label>
                <input
                  type="checkbox"
                  name="selectedField"
                  checked={selectedFields.includes(field.id)}
                  onChange={() => setFields(field.id)}
                />
              </div>
            );
          })}
        </div>
        <div>
          <label>Question Type:</label>
          <input
            type="radio"
            checked={selectedType === 0}
            name="type"
            onChange={() => setSelectedType(0)}
          />
          <label>Single choice question</label>
          <input
            type="radio"
            checked={selectedType === 1}
            name="type"
            onChange={() => setSelectedType(1)}
          />
          <label>Multiple choice question</label>
        </div>
        <div>
          <label>Qustion Text:</label>
          <br />
          <textarea
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Text below question:</label>
          <br />
          <textarea
            value={secondaryTitle}
            onChange={(e) => setSecondaryTitle(e.target.value)}
          ></textarea>
        </div>
        <hr />
        <div>
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
                {selectedType === QuestionType.singleChoiceQuestion ? (
                  <input
                    type="radio"
                    name="WhoIsCorrect"
                    checked={ans.correct}
                    onChange={() => setCorrectAnswer(ans.id)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    name="WhoIsCorrect"
                    checked={ans.correct}
                    onChange={() => setCorrectAnswer(ans.id)}
                  />
                )}
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
        <div className={classes.btns}>
          <Button onClick={() => setShowMsg(true)}>« Back</Button>
          <div className={classes.filler} />
          <Button>Show</Button>
          <Button success onClick={submitForm}>
            Save »
          </Button>
        </div>
        <PopupMessage
          show={showMsg}
          clear={() => setShowMsg(false)}
          warning
          action={() => history.goBack()}
          actionTag="« Go Back"
          clearTag="Stay"
          title="Warning!"
          text="Are you sure you want to go back? The changes you have made will not be saved!"
        />
      </form>
    </div>
  );
};

const mapState2Props = (state: RootState) => ({
  isSuccessfull: state.admin.isSuccessfull,
  admin: state.admin.admin,
});
const mapDispatch2Props = {
  addQuestion,
  questionAdded,
};

export default connect(mapState2Props, mapDispatch2Props)(EditQuestionPage);
