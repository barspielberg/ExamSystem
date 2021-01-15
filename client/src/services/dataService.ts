import axios from "axios";
import { Organization } from "../../../common/models";

const server = axios.create({ baseURL: "http://localhost:4000/" });

class DataService {
  async getOrganization(email: string, password: string) {
    try {
      const res = await server.get<Organization>("organization", {
        params: {
          email: email,
          password: password,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default new DataService();
