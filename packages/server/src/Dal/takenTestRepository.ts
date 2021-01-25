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
  async getTestById(id: string) {
    const tests = await this.getAll();
    return tests.find((t) => t.id === id);
  }

  async getOrAddNewTest(test: TakenTest): Promise<TakenTest> {
    const dbTest = await this.getTestById(test.id);
    if (dbTest) return dbTest;

    test.id = getNewId();
    const tests = await this.getAll();
    tests.push(test);

    const stringifiedTests = JSON.stringify({ tests: tests });
    await fsPromises.writeFile(takenTestsPath, stringifiedTests, "utf8");
    return test;
  }
}

export default new TakenTestsRepository();
