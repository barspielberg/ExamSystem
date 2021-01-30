import { TakenTest } from "@examsystem/common";
import { promises as fsPromises } from "fs";
import { resolve as pathResolve } from "path";
import { getNewId } from "../services/idService";

const takenTestsPath = pathResolve(
  __dirname,
  "..",
  "..",
  "data",
  "donetests.json"
);

class TakenTestsRepository {
  async getAll(): Promise<TakenTest[]> {
    const testsStr = await fsPromises.readFile(takenTestsPath, "utf8");
    return JSON.parse(testsStr).tests;
  }

  async getTest(testId: string, email: string): Promise<TakenTest | undefined> {
    const tests = await this.getAll();
    return tests.find((t) => t.testId === testId && t.student.email === email);
  }

  async addNewTest(test: TakenTest): Promise<TakenTest> {
    test.id = getNewId();
    const tests = await this.getAll();
    tests.push(test);

    const stringifiedTests = JSON.stringify({ tests: tests });
    await fsPromises.writeFile(takenTestsPath, stringifiedTests, "utf8");
    return test;
  }

  async updateTest(test: TakenTest): Promise<TakenTest | undefined> {
    const tests = await this.getAll();

    const dbTest = tests.find((t) => t.id === test.id && !t.submited);
    if (!dbTest) return undefined;

    const stringifiedTests = JSON.stringify({
      tests: tests.map((t) => (t.id === test.id ? test : t)),
    });
    await fsPromises.writeFile(takenTestsPath, stringifiedTests, "utf8");
    return test;
  }
}

export default new TakenTestsRepository();
