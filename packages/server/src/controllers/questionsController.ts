import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class QuestionsController {
  async getQuestion(req: Request, res: Response, next: NextFunction) {
    const { orgId, adminId, questionId } = req.query;
    const orgIdSt = orgId?.toString();
    const adminIdSt = adminId?.toString();
    const questionIdSt = questionId?.toString();
    if (!orgIdSt || !adminIdSt || !questionIdSt)
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are sending wrong details" });

    try {
      const question = await organizationRepository.getQuestion(orgIdSt, adminIdSt, questionIdSt);
      if (question) {
        res.status(200).json({ message: "Question fetched successfully", question });
      } else res.status(410).json({ message: "Question not found" });
    } catch (error) {
      res.status(500).json({ message: "OOPS somwthing went wrong", error });
    }
  }

  async addQuestion(req: Request, res: Response, next: NextFunction) {
    const { orgId, question, fieldsIds } = req.body;
    if (!orgId || !fieldsIds || !question)
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });

    try {
      const dbQuestion = await organizationRepository.addQuestion(orgId, question, fieldsIds);
      if (dbQuestion) {
        res.status(201).json({ message: "Question added successfully", question: dbQuestion });
      } else res.status(410).json({ message: "Question not found" });
    } catch (error) {
      res.status(500).json({ message: "OOPS somwthing went wrong", error });
    }
  }

  async updateQuestion(req: Request, res: Response, next: NextFunction) {
    const { orgId, question, fieldsIds } = req.body;
    if (!orgId || !fieldsIds || !question)
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });

    try {
      const dbQuestion = await organizationRepository.updateQuestion(orgId, question, fieldsIds);
      if (dbQuestion) {
        res.status(201).json({ message: "Question updated successfully", question: dbQuestion });
      } else res.status(410).json({ message: "Question not found" });
    } catch (error) {
      res.status(500).json({ message: "OOPS somwthing went wrong", error });
    }
  }
}

export default new QuestionsController();
