import { NextFunction, Request, Response } from "express";
import organozationRepository from '../Dal/organizationRepository';

class QuestionsController {
  getOrganization(req: Request, res: Response, next: NextFunction) {
    //TODO check credentials and return org or error

    console.log(req.params);
    try {
      //const admin = organozationRepository.checkAdminExists()
    } catch (error) {
      
    }
  }
}

export default new QuestionsController();