import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class OrganozationController {
  async getOrganization(req: Request, res: Response, next: NextFunction) {
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
    } catch (error) {
      res.status(500).json("OOPS something went wrong");
    }

  }
}

export default new OrganozationController();
