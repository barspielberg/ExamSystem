const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
import { Admin } from '../../../common/index';
import adminDb from '../data/admins.json';
import organizationsDb from '../data/organizations.json';

class OrganizationRepository {
  checkAdminExists(email: any, password: any) {
    const {admins } = adminDb;
    
    const admin = admins.find((adm: Admin) => {
      return adm.email === email && adm.password === password;
    });

    if(admin) return admin;
    else return null;
  }


  getOraganization(admin:Admin) {
    const org = organizationsDb.organizations.find(org => org.adminIds.includes(admin.id));
    if (org) return org;
    else return null;
  }

}

export default new OrganizationRepository();