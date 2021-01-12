import { NextFunction, Request, Response } from "express";

class TestsController {
  getTests(req: Request, res: Response, next: NextFunction) {
    res.send([1, 2, 3]);
  }
}

export default new TestsController();
