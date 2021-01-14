const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
import { Admin } from '../../../common/index';
const adminDb = require('../../data/admins.json');

class OrganizationRepository {
  async checkAdminExists(email: string | any, password: string | any) {
    // const data = JSON.parse(await readFile(adminDb));
    console.log(adminDb);
    // const admin = data.find((adm: Admin) => {
    //   return adm.email === email && adm.password === password;
    // });

    // return admin;
  }


}

export default new OrganizationRepository();