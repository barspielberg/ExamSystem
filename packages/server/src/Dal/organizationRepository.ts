import { Organization, Question } from "@examsystem/common";
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

  async getOrganization(orgId: string) {
    const orgStr = await fsPromises.readFile(organizationPath, "utf8");
    const organizations: Organization[] = JSON.parse(orgStr).organizations;
    return organizations.find(o => o.id === orgId);
  }

  async addQuestion(orgId: string, question: Question) {
    const organization = await this.getOrganization(orgId);
    const stringifiedOrg = JSON.stringify(organization?.questions.push(question));
    await fsPromises.appendFile(organizationPath, stringifiedOrg, 'utf8');
  }
}

export default new OrganizationRepository();
