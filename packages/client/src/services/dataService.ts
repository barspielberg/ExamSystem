import axios from "axios";
import { Admin, Question, Test } from "@examsystem/common";

const server = axios.create({ baseURL: "http://localhost:4000/" });

class DataService {
  async getAdmin(email: string, password: string) {
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
      console.log(error);
      return undefined;
    }
  }

  async addQuestion(question: Question, orgId: string, fieldsIds: string[]) {
    try {
      const res = await server.post("questions/addquestion", {
        orgId,
        question,
        fieldsIds,
      });
      if (res.status === 201) {
        return res.data.question;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async updateQuestion(question: Question, orgId: string, fieldsIds: string[]) {
    try {
      const res = await server.put("questions/updatequestion", {
        orgId,
        question,
        fieldsIds,
      });
      if (res.status === 200) {
        return res.data.question;
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async putTest(
    orgId: string,
    fieldId: string,
    test: Test
  ): Promise<Test | string> {
    try {
      const res = await server.put("tests", { orgId, fieldId, test });

      if (res.status === 200) return res.data.test;
      else return res.data.message;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export default new DataService();
