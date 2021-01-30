import axios, { AxiosResponse } from "axios";
import { Admin, Question, Test } from "@examsystem/common";

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
      return error.response.data;
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
      return error.response.data;
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
      return error.response.data;
    }
  }

  async getTests(orgId: string | null, fieldId: string | null): Promise<Test[] | string> {
    try {
      const res = await server.get<{ orgId: string; fieldId: string; }, AxiosResponse<{ message: string; tests: Test[] }>>("tests", {
        params: {
          orgId,
          fieldId
        }
      });

      return res.data.tests;
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
      return error.response.data;
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
      return error.response.data;
    }
  }
}

export default new DataService();
