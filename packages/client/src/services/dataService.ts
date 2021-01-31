import axios, { AxiosResponse } from "axios";
import { Admin, Question, TakenTest, Test } from "@examsystem/common";

const server = axios.create({ baseURL: "http://localhost:4000/" });

class DataService {
  async getAdmin(email: string, password: string): Promise<Admin | string> {
    try {
      const res = await server.get<{ message: string; admin: Admin }>(
        "organization",
        {
          params: {
            email: email,
            password: password,
          },
        }
      );
      return res.data.admin;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }

  async addQuestion(
    question: Question,
    orgId: string,
    fieldsIds: string[]
  ): Promise<Question | string> {
    try {
      const res = await server.post("questions/addquestion", {
        orgId,
        question,
        fieldsIds,
      });
      return res.data.question;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }

  async updateQuestion(
    question: Question,
    orgId: string,
    fieldsIds: string[]
  ): Promise<Question | string> {
    try {
      const res = await server.put("questions/updatequestion", {
        orgId,
        question,
        fieldsIds,
      });
      return res.data.question;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }


  async getTakenTests(testId: string | undefined): Promise<TakenTest[] | string> {
    try {
      const res = await server.get<{ testId: string; }, AxiosResponse<{ message: string; takenTests: TakenTest[] }>>("tests/takentests", {
        params: {
          testId,
        }
      });

      return res.data.takenTests;
    } catch (error) {
      console.log(error);
      return 'failed';
    }
  }

  async putTest(
    orgId: string,
    fieldId: string,
    test: Test
  ): Promise<Test | string> {
    try {
      const res = await server.put<
        { orgId: string; fieldId: string; test: Test },
        AxiosResponse<{ message: string; test: Test }>
      >("tests", { orgId, fieldId, test });

      return res.data.test;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }
  async postTest(
    orgId: string,
    fieldId: string,
    test: Test
  ): Promise<Test | string> {
    try {
      const res = await server.post<
        { orgId: string; fieldId: string; test: Test },
        AxiosResponse<{ message: string; test: Test }>
      >("tests", { orgId, fieldId, test });

      return res.data.test;
    } catch (error) {
      return error.response?.data || "The server is down";
    }
  }
}

export default new DataService();
