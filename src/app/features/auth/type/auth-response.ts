export interface AuthLoginResponse {
  accessToken: string;
  organization: loginOrganization;
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
