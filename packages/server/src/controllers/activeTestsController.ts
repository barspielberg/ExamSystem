import { AnsweredQuestion, Student, TakenTest } from "@examsystem/common";
import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";
import takenTestRepository from "../Dal/takenTestRepository";
import { getNewId } from "../services/idService";

class ActiveTestsController {
  async postStartTest(req: Request, res: Response, next: NextFunction) {
    const { testId: tId, student: st } = req.body;
    const testId = tId as string;
    const student = st as Student;
    if (!testId || !student) {
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });
    }
    //TODO check email is valid
    try {
      const takenTest = await takenTestRepository.getTest(
        testId,
        student.email
      );

      if (takenTest)
        return res.status(200).json({
          message: "Looks like you're already in the middle of a test",
          test: takenTest,
        });

      const test = await organizationRepository.getTest(testId);
      if (!test)
        return res.status(410).json({ message: "OOPS Test not found" });

      const testQues: AnsweredQuestion[] = (
        await organizationRepository.getQuestionsByIds(test.questionIds)
      ).map((q) => ({
        oringinalQuestionId: q.id,
        type: q.type,
        mainTitle: q.mainTitle,
        secondaryTitle: q.secondaryTitle,
        alignment: q.alignment,
        possibleAnswers: q.possibleAnswers.map((a) => ({
          content: a.content,
          id: a.id,
        })),
      }));

      const testObj: TakenTest = {
        id: getNewId(),
        testId: testId,
        student: student,
        title: test.title,
        introduction: test.introduction,
        lang: test.lang,
        questions: testQues,
      };

      const dbTest = await takenTestRepository.addNewTest(testObj);

      return res
        .status(201)
        .json({ message: "Test started successfully", test: dbTest });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong", error: error });
    }
  }

  async putTest(req: Request, res: Response, next: NextFunction) {
    const { test: t } = req.body;
    const test = t as TakenTest;
    if (!test) {
      return res
        .status(400)
        .json({ message: "OOPS it seems like you are missing some inputs" });
    }

    try {
      const dbTest = await takenTestRepository.updateTest(test);

      if (!dbTest)
        return res.status(410).json({ message: "OOPS Test not found" });

      return res
        .status(201)
        .json({ message: "Test updated successfully", test: dbTest });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "OOPS somwthing went wrong", error: error });
    }
  }
}

export default new ActiveTestsController();
