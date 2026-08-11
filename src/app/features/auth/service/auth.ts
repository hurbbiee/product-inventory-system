import { api } from "@/lib/api-client";
import { AuthLoginResponse } from "../type/auth-response";
import { AuthLoginRequestInterface } from "../type/auth-request";

export const AuthService = {
  loginOrganization: (payload: AuthLoginRequestInterface) =>
    api.post<AuthLoginResponse>(`/api/auth/organization/login`, payload),
};
