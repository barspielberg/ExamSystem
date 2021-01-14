const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
import { Admin } from "../../../common/index";
//TODO import admindb file, fix file system bug first.
import adminDb from "../data/admins.json";

class OrganizationRepository {
  //why string | any ?
  async checkAdminExists(email: string, password: string) {
    const admins: Admin[] = adminDb.admins;
    const admin = admins.find((adm: Admin) => {
      return adm.email === email && adm.password === password;
    });
    return admin;
  }
}

export default new OrganizationRepository();
