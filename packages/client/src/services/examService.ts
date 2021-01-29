import { Student, TakenTest } from "@examsystem/common";
import axios, { AxiosResponse } from "axios";

const server = axios.create({ baseURL: "http://localhost:4000/activetests" });
class ExamService {
  async postStartNew(
    testId: string,
    student: Student
  ): Promise<TakenTest | string> {
    try {
      const res = await server.post<postData, postResponse>("/", {
        testId,
        student,
      });
      const { test, message } = res.data;
      if (test) return test;
      else return message;
    } catch (error) {
      return error.response.data;
    }
  }
}

export default new ExamService();

type postData = {
  testId: string;
  student: Student;
};
type postResponse = AxiosResponse<{
  test?: TakenTest;
  message: string;
  error?: any;
}>;
