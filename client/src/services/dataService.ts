import axios from "axios";

const server = axios.create({ baseURL: "http://localhost:3000/" });

export class DataService {
  async getQuestions() {
    try {
      const res = await server.get("questions");
      return res.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
