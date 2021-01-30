import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class TestsController {
  async getTests(req: Request, res: Response, next: NextFunction) {
    const { orgId, fieldId } = req.query;
    const orgIdSt = orgId?.toString();
    const fieldIdSt = fieldId?.toString();
    if (!orgIdSt || !fieldIdSt)
      return res
        .status(400)
        .json({ message: "OOPS fetching tests failed" });

    try {
      const tests = await organizationRepository.getTests(orgIdSt, fieldIdSt);
      if (tests)
        return res
          .status(200)
          .json({ message: "Test fetched successfully", tests });
      else res.status(410).json({ message: "Tests not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong while fetching tests", error });
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
