import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class ActiveTestsController {
  async postStartTest(req: Request, res: Response, next: NextFunction) {
    const { testId, student } = req.body;

    try {
      const test = await organizationRepository.getTest(testId);
      if (!test)
        return res.status(410).json({ message: "OOPS Test not found" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong", error: error });
    }
  }
}

export default new ActiveTestsController();
