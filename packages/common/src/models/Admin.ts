import { Organization } from "./Organization";

export interface Admin {
  id: string;
  email: string;
  password: string;
  organizationIds: string[];
  organizations: Organization[];
}
