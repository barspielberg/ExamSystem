import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class QuestionsController {
  // getQuestions(req: Request, res: Response, next: NextFunction) {
  //   res.send([1, 2, 3]);
  // }
  async addQuestion(req: Request, res: Response, next: NextFunction) {
    const { orgId, question } = req.body;
    if (question.id === "") question.id = Date.now().toString()
    try {
      await organizationRepository.addQuestion(orgId, question);
      res.status(201).json({ message: "Question added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "OOPS somwthing went wrong" });
    }
  }
}

export default new QuestionsController();
