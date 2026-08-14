import { api } from "@/lib/api-client";
import {
  AuthOrganizationLoginResponse,
  AuthUserLoginReponse,
} from "../type/auth-response";
import { AuthLoginRequestInterface } from "../type/auth-request";

export const AuthService = {
  loginOrganization: (payload: AuthLoginRequestInterface) =>
    api.post<AuthOrganizationLoginResponse>(
      `/api/auth/organization/login`,
      payload,
    ),

  loginUser: (payload: AuthLoginRequestInterface) =>
    api.post<AuthUserLoginReponse>(`/api/auth/user/login`, payload),
};
