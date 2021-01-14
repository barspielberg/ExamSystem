import { NextFunction, Request, Response } from "express";
import organozationRepository from "../Dal/organizationRepository";

class OrganozationController {
  getOrganization(req: Request, res: Response, next: NextFunction) {
    //TODO check credentials and return org or error
    const { email, password } = req.query;
    const emailSt = email?.toString();
    const passwordSt = password?.toString();
    if (!emailSt || !passwordSt)
      return res.status(401).send("not valid parametrs");

    try {
      const admin = organozationRepository.checkAdminExists(
        emailSt,
        passwordSt
      );
    } catch (error) {}
  }
}

export default new OrganozationController();
