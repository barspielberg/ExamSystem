const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
import { Admin } from '../../../common/index';
//TODO import admindb file, fix file system bug first.
import adminDb from '../data/admins.json';

class OrganizationRepository {
  async checkAdminExists(email: string | any, password: string | any) {
    console.log(adminDb);
    // const data = JSON.parse(await readFile(adminDb));
    //console.log(adminDb);
    // const admin = data.find((adm: Admin) => {
    //   return adm.email === email && adm.password === password;
    // });

    // return admin;
    console.log('nanana');
  }


}

export default new OrganizationRepository();