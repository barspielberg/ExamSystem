import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";

class OrganozationController {
  async getOrganization(req: Request, res: Response, next: NextFunction) {
    const { adminId } = req.query;
    const adminIdSt = adminId?.toString();

    if (!adminIdSt)
      return res.status(401).send("not valid parametrs");

    try {
      const organizations = await organizationRepository.getOrganizations(adminIdSt);

      if (!organizations)
        return res.status(401).send("there are no organizations for that admin");

      return res.status(200).json({ "message": "Organizations fetched successfully", organizations });
    } catch (error) {
      res.status(500).send("OOPS something went wrong");
    }
  }
}

export default new OrganozationController();
