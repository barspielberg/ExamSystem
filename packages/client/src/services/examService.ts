import { Student, TakenTest, Test } from "@examsystem/common";
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

      const { originalTest, studentTest, message } = res.data;

      if (originalTest && studentTest) return { originalTest, studentTest };
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

type testReview = {
  studentTest: TakenTest;
  originalTest: Test;
};

type submitResponse = AxiosResponse<{
  studentTest?: TakenTest;
  originalTest?: Test;
  message: string;
  error?: any;
}>;
