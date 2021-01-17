import { Admin } from "@examsystem/common";
import { promises as fsPromises } from "fs";
import { resolve as pathResolve } from "path";

const adminPath = pathResolve(__dirname, "..", "..", "data", "admins.json");


class AdminRepository {
  async checkAdminExists(email: string, password: string) {
    const adminStr = await fsPromises.readFile(adminPath, "utf8");

    const admins: Admin[] = JSON.parse(adminStr).admins;
    return admins.find(
      (adm) => adm.email === email && adm.password === password
    );
  }
}

export default new AdminRepository();