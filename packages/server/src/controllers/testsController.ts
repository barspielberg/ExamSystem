import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class TestsController {
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
          .status(201)
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
