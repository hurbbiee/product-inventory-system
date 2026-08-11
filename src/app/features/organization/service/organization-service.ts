import { api } from "@/lib/api-client";
import {
  CreateOrganizationRequestType,
  CreateOrganizationResponseType,
} from "../type/create-organization";

export const OrganizationService = {
  register: (payload: CreateOrganizationRequestType) =>
    api.post<CreateOrganizationResponseType>(
      `/api/organizations/create`,
      payload,
    ),
};
