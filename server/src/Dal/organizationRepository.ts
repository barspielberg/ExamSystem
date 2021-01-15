<<<<<<< HEAD
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

=======
// const fs = require("fs");
// const util = require("util");
// const writeFile = util.promisify(fs.writeFile);
// const readFile = util.promisify(fs.readFile);
import { Admin, Organization } from "../../../common/index";
//TODO import admindb file, fix file system bug first.
import adminDb from "../data/admins.json";
import organizationDb from "../data/organizations.json";

class OrganizationRepository {
  //why string | any ?
  async checkAdminExists(email: string, password: string) {
    const admins: Admin[] = adminDb.admins;
    return admins.find(
      (adm) => adm.email === email && adm.password === password
    );
  }

  async getOrganization(admin: Admin) {
    const organizations: Organization[] = organizationDb.organizations;
    return organizations.find((o) => o.adminIds.includes(admin.id));
  }
>>>>>>> c29a44c1330945d014d63361e90a482f5ba32034
}

export default new OrganizationRepository();
