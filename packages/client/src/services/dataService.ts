import axios from "axios";
import { Admin, Question } from "@examsystem/common";

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
      const res = await server.post('questions/addquestion', { orgId, question });
      if (res.status === 201) { console.log(res.data.message); return true; }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

export default new DataService();
