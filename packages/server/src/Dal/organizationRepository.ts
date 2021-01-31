import { FieldOfStudy, Organization, Question, Test } from "@examsystem/common";
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

  async addQuestion(orgId: string, question: Question, fieldsIds: string[]) {
    if (question.id === "") question.id = getNewId();
    const organizations = await this.getAllOrganizations();
    const foundOrg = organizations.find((o) => o.id === orgId);
    foundOrg?.questions.push(question);
    foundOrg?.fields.map((field) => {
      if (fieldsIds.includes(field.id)) field.questionIds.push(question.id);
    });

    const dbQuestion = foundOrg?.questions.find((q) => q.id === question.id);

    const stringifiedOrgs = JSON.stringify({ organizations: organizations });
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, "utf8");
    return dbQuestion;
  }

  async updateQuestion(orgId: string, question: Question, fieldsIds: string[]) {
    const organizations = await this.getAllOrganizations();
    const foundOrg = organizations.find((o) => o.id === orgId);
    foundOrg?.questions.map((q, index) => {
      if (q.id === question.id) foundOrg.questions[index] = question;
    });

    foundOrg?.fields.map((field) => {
      if (
        fieldsIds.includes(field.id) &&
        !field.questionIds.includes(question.id)
      )
        field.questionIds.push(question.id);

      if (!fieldsIds.includes(field.id)) {
        field.questionIds = field.questionIds.filter(q => q !== question.id);
      }
    });

    const dbQuestion = foundOrg?.questions.find((q) => q.id === question.id);

    const stringifiedOrgs = JSON.stringify({ organizations: organizations });
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, "utf8");
    return dbQuestion;
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
  async postTest(orgId: string, fieldId: string, test: Test) {
    const organizations = await this.getAllOrganizations();

    const tests = organizations
      .find((o) => o.id === orgId)
      ?.fields.find((f) => f.id === fieldId)?.tests;
    test.id = getNewId();
    tests?.push(test);

    const dbTest = tests?.find((t) => t.id === test.id);

    const stringifiedOrgs = JSON.stringify({ organizations: organizations });
    await fsPromises.writeFile(organizationPath, stringifiedOrgs, "utf8");
    return dbTest;
  }
  async getTest(id: string) {
    const organizations = await this.getAllOrganizations();
    return organizations
      .reduce((pre, cur) => [...pre, ...cur.fields], Array<FieldOfStudy>())
      .reduce((pre, cur) => [...pre, ...cur.tests], Array<Test>())
      .find((t) => t.id === id);
  }
  async getQuestionsByIds(ids: string[]) {
    const organizations = await this.getAllOrganizations();
    return organizations
      .reduce((pre, cur) => [...pre, ...cur.questions], Array<Question>())
      .filter((q) => ids.includes(q.id));
  }
}

export default new OrganizationRepository();
