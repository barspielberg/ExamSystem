import { Admin, Organization } from "../../../common/index";
import adminDb from "../data/admins.json";
import organizationDb from "../data/organizations.json";

class OrganizationRepository {
  async checkAdminExists(email: string, password: string) {
    const admins: Admin[] = adminDb.admins;
    return admins.find(
      (adm) => adm.email === email && adm.password === password
    );
  }

  async getOrganization(admin: Admin) {
    const organizations: Organization[] = organizationDb.organizations;
    return organizations.find((o) => o.adminIds.includes(admin.id));
  }
}

export default new OrganizationRepository();
