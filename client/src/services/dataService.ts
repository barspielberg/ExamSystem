import axios from "axios";
import { Admin, Organization } from "../../../common/models";

const server = axios.create({ baseURL: "http://localhost:3000/" });

class DataService {
  async getOrganization(admin: Admin) {
    try {
      const res = await server.get<Organization>("organization", {
        data: admin,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}

export default new DataService();
