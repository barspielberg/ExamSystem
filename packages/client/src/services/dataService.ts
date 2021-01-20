import axios from "axios";
import { Admin, Organization, Question } from "@examsystem/common";

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

  async addQuestion(question: Question) {
    console.log("hey mich", question);
    return true;
  }
}

export default new DataService();
