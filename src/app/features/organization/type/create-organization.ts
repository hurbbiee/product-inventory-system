export interface CreateOrganizationRequestType {
  name: string;
  email: string;
  password: string;
  slug: string;
}

export interface CreateOrganizationResponseType {
  organization: organizationCreate;
  user: userCreate;
}

export interface organizationCreate {
  id: number;
  name: string;
  slug: string;
}

export interface userCreate {
  id: number;
  email: string;
  organizationId: number;
}
