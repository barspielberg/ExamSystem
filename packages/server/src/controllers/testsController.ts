import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";
import takenTestRepository from "../Dal/takenTestRepository";

class TestsController {
  async getTakenTests(req: Request, res: Response, next: NextFunction) {
    const { testId } = req.query;

    const testIdSt = testId?.toString();
    if (!testIdSt)
      return res
        .status(400)
        .json({ message: "OOPS fetching taken tests failed" });

    try {
      const takenTests = await takenTestRepository.getTakenTests(testIdSt);
      if (takenTests)
        return res
          .status(200)
          .json({ message: "Taken Test fetched successfully", takenTests });
      else res.status(410).json({ message: "Taken Tests not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong while fetching taken tests", error });
    }
  }

  async putTest(req: Request, res: Response, next: NextFunction) {
    const { orgId, fieldId, test } = req.body;
    if (!orgId || !fieldId || !test)
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });

    try {
      const dbTest = await organizationRepository.putTest(orgId, fieldId, test);
      if (dbTest)
        return res
          .status(200)
          .json({ message: "Test updated successfully", test: dbTest });
      else res.status(410).json({ message: "Test not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong", error: error });
    }
  }
  async postTest(req: Request, res: Response, next: NextFunction) {
    const { orgId, fieldId, test } = req.body;
    if (!orgId || !fieldId || !test)
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });

    try {
      const dbTest = await organizationRepository.postTest(
        orgId,
        fieldId,
        test
      );
      if (dbTest)
        return res
          .status(200)
          .json({ message: "Test updated successfully", test: dbTest });
      else res.status(410).json({ message: "Test not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong", error: error });
    }
  }
}

export default new TestsController();
