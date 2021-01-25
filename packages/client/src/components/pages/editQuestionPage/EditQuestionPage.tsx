import classes from "./EditQUestionPage.module.scss";
import React, { useEffect, useState } from "react";
import { Answer, QuestionType, Question, Admin } from "@examsystem/common";
import { RootState } from "../../../redux/reducers/mainReducer";
import { connect } from "react-redux";
import { addQuestion, putQuestion } from "../../../redux/actions/adminActions";
import { Button, DisplayQuestion, PopupMessage } from "../../uiElements";
import { useParams } from "../../../hooks";
import { useHistory } from "react-router";

interface IEditQuestionPageProps {
  addQuestion: (question: Question, orgId: string, fieldsIds: string[]) => void;
  putQuestion: (question: Question, orgId: string, fieldsIds: string[]) => any;
  admin: Admin | null;
}
//TODO by Michael
const EditQuestionPage: React.FC<IEditQuestionPageProps> = ({
  addQuestion,
  putQuestion,
  admin,
}) => {
  const history = useHistory();
  const { organizationId, questionId } = useParams();
  const fields = admin?.organizations.find((o) => o.id === organizationId)
    ?.fields;
  const [selectedFields, setSelectedFields] = useState<string[] | any[]>([]);
  const [showMsg, setShowMsg] = useState(false);
  const [question, setQuestion] = useState(newQuestion);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (questionId) {
      (async function () {
        const questionFromDb = admin?.organizations
          .find((o) => o.id === organizationId)
          ?.questions.find((q) => q.id === questionId);
        if (typeof questionFromDb !== "string" && questionFromDb)
          setQuestion(questionFromDb);
      })();
    }
  }, [questionId, organizationId, admin?.organizations]);

  const updateContent = (index: any) => (e: any) => {
    let newArr = [...question.possibleAnswers];
    newArr[index].content = e.target.value;
    setQuestion({ ...question, possibleAnswers: newArr });
  };

  const removeAnswer = (id: string) => {
    let newArr = question.possibleAnswers.filter((ans) => ans.id !== id);
    setQuestion({ ...question, possibleAnswers: newArr });
  };

  const addNewAnswer = () => {
    const newAnswer: Answer = {
      id: question.possibleAnswers.length.toString(),
      content: "new answer",
      correct: false,
    };
    setQuestion({
      ...question,
      possibleAnswers: [...question.possibleAnswers, newAnswer],
    });
  };

  const setCorrectAnswer = (id: string) => {
    question.type === QuestionType.singleChoiceQuestion
      ? setQuestion({
          ...question,
          possibleAnswers: question.possibleAnswers.map((ans) => ({
            ...ans,
            correct: ans.id === id,
          })),
        })
      : setQuestion({
          ...question,
          possibleAnswers: question.possibleAnswers.map((ans) => ({
            ...ans,
            correct: ans.id === id ? !ans.correct : ans.correct,
          })),
        });
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
    if (question.id === "") {
      addQuestion(question, organizationId || "-1", selectedFields);
      history.goBack();
    } else {
      putQuestion(question, organizationId || "-1", selectedFields);
      history.goBack();
    }
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
            checked={question.type === 0}
            name="type"
            onChange={() => setQuestion({ ...question, type: 0 })}
          />
          <label>Single choice question</label>
          <input
            type="radio"
            checked={question.type === 1}
            name="type"
            onChange={() => setQuestion({ ...question, type: 1 })}
          />
          <label>Multiple choice question</label>
        </div>
        <div>
          <label>Qustion Text:</label>
          <br />
          <textarea
            value={question.mainTitle}
            onChange={(e) =>
              setQuestion({ ...question, mainTitle: e.target.value })
            }
          ></textarea>
        </div>
        <div>
          <label>Text below question:</label>
          <br />
          <textarea
            value={question.secondaryTitle}
            onChange={(e) =>
              setQuestion({ ...question, secondaryTitle: e.target.value })
            }
          ></textarea>
        </div>
        <hr />
        <div>
          <label>Possible Answers:</label>
          {question.possibleAnswers.map((ans, index) => {
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
                {question.type === QuestionType.singleChoiceQuestion ? (
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
            checked={question.alignment === 0}
            name="alignment"
            onChange={() => setQuestion({ ...question, alignment: 0 })}
          />
          <label>Horizontal</label>
          <input
            type="radio"
            checked={question.alignment === 1}
            name="alignment"
            onChange={() => setQuestion({ ...question, alignment: 1 })}
          />
          <label>Vertical</label>
        </div>
        <hr />
        <div>
          <label>Tags: </label>
          <input
            value={question.tags}
            onChange={(e) =>
              setQuestion({ ...question, tags: e.target.value.split(",") })
            }
          />
        </div>
        <div className={classes.btns}>
          <Button onClick={() => setShowMsg(true)}>« Back</Button>
          <div className={classes.filler} />
          <Button
            onClick={() => setShowId(showId === question.id ? "" : question.id)}
          >
            {showId === question.id ? "Shrink" : "Show"}
          </Button>
          <Button success onClick={submitForm}>
            Save »
          </Button>
        </div>
        <div>
          {showId === question.id && (
            <div key={question.id + 5}>
              <div style={{ textAlign: "start" }}>
                <DisplayQuestion question={question} />
              </div>
            </div>
          )}
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
  admin: state.admin.admin,
});
const mapDispatch2Props = {
  addQuestion,
  putQuestion,
};

export default connect(mapState2Props, mapDispatch2Props)(EditQuestionPage);

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

const newQuestion: Question = {
  id: "",
  mainTitle: "",
  secondaryTitle: "",
  alignment: 0,
  type: 0,
  possibleAnswers: defaultAnswers,
  tags: [],
  lastUpdate: new Date().toLocaleDateString(),
};
