import { Admin, Organization } from "@examsystem/common";
import { promises as fsPromises } from "fs";
import { resolve as pathResolve } from "path";
// import "../data/admins.json";
// import "../data/organizations.json";

const adminPath = pathResolve(__dirname, "..", "..", "data", "admins.json");
const organizationPath = pathResolve(
  __dirname,
  "..",
  "..",
  "data",
  "organizations.json"
);

class OrganizationRepository {
  async checkAdminExists(email: string, password: string) {
    const adminStr = await fsPromises.readFile(adminPath, "utf8");

    const admins: Admin[] = JSON.parse(adminStr).admins;
    return admins.find(
      (adm) => adm.email === email && adm.password === password
    );
  }

  async getOrganization(admin: Admin) {
    const orgStr = await fsPromises.readFile(organizationPath, "utf8");
    const organizations: Organization[] = JSON.parse(orgStr).organizations;
    return organizations.find((o) => o.adminIds.includes(admin.id));
  }
}

export default new OrganizationRepository();
