import { NextFunction, Request, Response } from "express";
import organizationRepository from "../Dal/organizationRepository";
import adminRepository from "../Dal/adminRepository";

class OrganozationController {
  async getAdmin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.query;
    const emailSt = email?.toString();
    const passwordSt = password?.toString();
    if (!emailSt || !passwordSt)
      return res.status(401).send("not valid parametrs");

    try {
      const admin = await adminRepository.checkAdminExists(
        emailSt,
        passwordSt
      );
      if (!admin) return res.status(401).send("one or more is not correct");
      const organizations = await organizationRepository.getOrganizations(admin.id);

      admin.organizations = organizations;

      return res.status(200).json({ message: "admin fetched successfully", admin });
    } catch (error) {
      res.status(500).send("OOPS something went wrong");
    }

  }

  // async getOrganizations(req: Request, res: Response, next: NextFunction) {
  //   const { adminId } = req.query;
  //   const adminIdSt = adminId?.toString();

  //   if (!adminIdSt)
  //     return res.status(401).send("not valid parametrs");

  //   try {
  //     const organizations = await organizationRepository.getOrganizations(adminIdSt);

  //     if (!organizations)
  //       return res.status(401).send("there are no organizations for that admin");

  //      return organizations;
  //   } catch (error) {
  //     res.status(500).send("OOPS something went wrong");
  //   }
  // }
}

export default new OrganozationController();
