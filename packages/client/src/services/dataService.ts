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

  async addQuestion(question: Question, orgId: string) {
    try {
      const res = await server.post("questions/addquestion", {
        orgId,
        question,
      });
      if (res.status === 201) {
        console.log(res.data.message);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async putTest(
    orgId: string,
    fieldId: string,
    test: Test
  ): Promise<Test | undefined> {
    try {
      const res = await server.put("tests", { orgId, fieldId, test });

      if (res.status === 200) return res.data.test;
      else return undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export default new DataService();
