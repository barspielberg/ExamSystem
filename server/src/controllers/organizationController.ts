import { NextFunction, Request, Response } from "express";
import organozationRepository from '../Dal/organizationRepository';

class QuestionsController {
  getOrganization(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.query;

    try {
      const admin = organozationRepository.checkAdminExists(email, password);
      if (admin) {
        const org = organozationRepository.getOraganization(admin);
        if (org) {
          res.status(200).json({
            message: 'Organization fetched successfully',
            organization: org
          });
        } else {
          res.status(500).json({
            message: 'Fetching Organization failed'
          });
        }
      } else {
        res.status(500).json({
          message: 'Wrong Credentials, try again or sign up'
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'OOPS something went wrong'
      });
    }
  }
}

export default new QuestionsController();