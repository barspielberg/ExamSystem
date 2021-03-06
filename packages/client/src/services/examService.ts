import {
  Question,
  QuestionType,
  Student,
  TakenTest,
  Test,
} from "@examsystem/common";

import axios, { AxiosResponse } from "axios";

const server = axios.create({ baseURL: "http://localhost:4000/activetests" });
class ExamService {
  async postStartNew(
    testId: string,
    student: Student
  ): Promise<TakenTest | string> {
    try {
      const res = await server.post<postData, response>("/", {
        testId,
        student,
      });

      const { test, message } = res.data;
      if (test) return test;
      else return message;
    } catch (error) {
      return error.response.data.message || "The server is down";
    }
  }

  async putTest(test: TakenTest): Promise<TakenTest | string> {
    try {
      const res = await server.put<putData, response>("/", { test });

      const { test: dbTest, message } = res.data;

      if (dbTest) return dbTest;
      else return message;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }

  async putSubmitTest(test: TakenTest): Promise<testReview | string> {
    try {
      const res = await server.put<putData, submitResponse>("/submit", {
        test,
      });

      const { originalTest, studentTest, questions, message } = res.data;

      if (originalTest && studentTest && questions)
        return { originalTest, studentTest, questions };
      else return message;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }

  async getAll(): Promise<TakenTest[] | string> {
    try {
      const res = await server.get<null, getAllResponse>("/");
      const { message, tests } = res.data;
      if (tests) return tests;
      else return message;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }
}

export default new ExamService();

type postData = {
  testId: string;
  student: Student;
};
type putData = {
  test: TakenTest;
};
type response = AxiosResponse<{
  test?: TakenTest;
  message: string;
  error?: any;
}>;

type getAllResponse = AxiosResponse<{
  tests?: TakenTest[];
  message: string;
  error?: any;
}>;

type testReview = {
  studentTest: TakenTest;
  originalTest: Test;
  questions: Question[];
};

type submitResponse = AxiosResponse<{
  studentTest?: TakenTest;
  originalTest?: Test;
  questions?: Question[];
  message: string;
  error?: any;
}>;

export const calcGrade = (studentTest: TakenTest, answers: Question[]) => {
  const numOfCurrect = getNumOfCorrectAnswers(studentTest, answers);
  const grade = (numOfCurrect / answers.length) * 100;
  return { grade, numOfCurrect };
};

const getNumOfCorrectAnswers = (
  studentTest: TakenTest,
  answers: Question[]
) => {
  return answers.reduce((pre, cur) => {
    const answersId = studentTest.questions
      .find((q) => q.oringinalQuestionId === cur.id)
      ?.possibleAnswers.filter((a) => a.correct)
      .map((a) => a.id);
    if (!answersId) return pre;

    const currectsId = cur.possibleAnswers
      .filter((a) => a.correct)
      .map((a) => a.id);
    // console.log("answersId", answersId, "currectsId", currectsId);

    if (cur.type === QuestionType.singleChoiceQuestion) {
      return answersId.includes(currectsId[0]) ? pre + 1 : pre;
    } else {
      const currectOfAnswered =
        answersId.filter((a) => currectsId.includes(a)).length /
        answersId.length;
      const answeredOfCurrect =
        currectsId.filter((a) => answersId.includes(a)).length /
        currectsId.length;
      return pre + currectOfAnswered * answeredOfCurrect;
    }
  }, 0);
};
