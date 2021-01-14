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
}

export default new OrganizationRepository();
