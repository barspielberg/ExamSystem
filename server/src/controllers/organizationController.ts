import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

<<<<<<< HEAD
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
=======
class OrganozationController {
  async getOrganization(req: Request, res: Response, next: NextFunction) {
    //TODO check credentials and return org or error
    const { email, password } = req.query;
    const emailSt = email?.toString();
    const passwordSt = password?.toString();
    if (!emailSt || !passwordSt)
      return res.status(401).send("not valid parametrs");

    try {
      const admin = await organizationRepository.checkAdminExists(
        emailSt,
        passwordSt
      );
      if (!admin) return res.status(401).send("one or more is not correct");

      const organization = await organizationRepository.getOrganization(admin);

      if (!organization)
        return res.status(401).send("there are no organization for that admin");

      return res.status(200).json(organization);
    } catch (error) {}
>>>>>>> c29a44c1330945d014d63361e90a482f5ba32034
  }
}

export default new OrganozationController();
