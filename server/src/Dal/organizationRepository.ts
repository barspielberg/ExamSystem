const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const adminDb = '../../data/admins.json';
import { Admin } from '../../../common/index';

class OrganizationRepository {
  async checkAdminExists(email: string, password: string) {
    const data = JSON.parse(await readFile(adminDb));
    const admin = data.find((adm: Admin) => {
      return adm.email === email && adm.password === password;
    });

    return admin;
  }


}

export default new OrganizationRepository();