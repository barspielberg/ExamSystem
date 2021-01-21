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

  async getAllOrganizations() {
    const orgStr = await fsPromises.readFile(organizationPath, "utf8");
    const organizations: Organization[] = JSON.parse(orgStr).organizations;
    return organizations;
  }

  async addQuestion(orgId: string, question: Question) {
    const organizations = await this.getAllOrganizations();
    organizations.find(o => o.id === orgId)?.questions.push(question);
    const stringifiedOrgs = JSON.stringify({organizations: organizations});
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, 'utf8');
  }
}

export default new OrganizationRepository();
