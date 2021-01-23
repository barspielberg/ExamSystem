import { Organization, Question, Test } from "@examsystem/common";
import { promises as fsPromises } from "fs";
import { resolve as pathResolve } from "path";
import { getNewId } from "../services/idService";
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
    question.id = getNewId();
    const organizations = await this.getAllOrganizations();
    organizations.find((o) => o.id === orgId)?.questions.push(question);
    const stringifiedOrgs = JSON.stringify({ organizations: organizations });
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, "utf8");
  }

  async putTest(orgId: string, fieldId: string, test: Test) {
    const organizations = await this.getAllOrganizations();

    const tests = organizations
      .find((o) => o.id === orgId)
      ?.fields.find((f) => f.id === fieldId)?.tests;

    const index = tests?.findIndex((t) => t.id === test.id);
    if (index != undefined && index != -1) {
      tests?.splice(index, 1, test);
    }

    const dbTest = tests?.find((t) => t.id === test.id);

    const stringifiedOrgs = JSON.stringify({ organizations: organizations });
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, "utf8");
    return dbTest;
  }
}

export default new OrganizationRepository();
