export interface AuthOrganizationLoginResponse {
  accessToken: string;
  organization: loginOrganization;
  user: user;
}

export interface AuthUserLoginReponse {
  accessToken: string;
  user: user;
}

export interface loginOrganization {
  id: number;
  code: string;
  name: string;
  email: string;
  slug: string;
}

export interface user {
  id: string;
  name: string;
  role: string;
}
