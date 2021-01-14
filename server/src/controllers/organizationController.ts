import { NextFunction, Request, Response } from "express";
import organozationRepository from '../Dal/organizationRepository';

class QuestionsController {
   getOrganization(req: Request, res: Response, next: NextFunction) {
    //TODO check credentials and return org or error
    const {email,password} = req.query;

    try {
      const admin = organozationRepository.checkAdminExists(email, password);
     // console.log("nananan",admin);
    } catch (error) {
      
    }
  }
}

export default new QuestionsController();