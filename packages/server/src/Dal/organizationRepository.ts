import { Organization } from "@examsystem/common";
import { promises as fsPromises } from "fs";
import { resolve as pathResolve } from "path";
const organizationPath = pathResolve(
  __dirname,
  "..",
  "..",
  "data",
  "organizations.json"
);

class OrganizationRepository {
  async getOrganizations(adminId: string) {
    const orgStr = await fsPromises.readFile(organizationPath, "utf8");
    const organizations: Organization[] = JSON.parse(orgStr).organizations;
    return organizations.filter((o) => o.adminIds.includes(adminId));
  }
}

export default new OrganizationRepository();
