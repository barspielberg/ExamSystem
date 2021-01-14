import axios from "axios";
import { Question } from "../../../common/models";

const server = axios.create({ baseURL: "http://localhost:3000/" });

export class DataService {
  async getQuestions() {
    try {
      const res = await server.get<Question[]>("questions");
      return res.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
