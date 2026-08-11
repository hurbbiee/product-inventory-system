import { OrganizationRegisterFormType } from "@/app/features/auth/type/organization-request";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email?: string;
  password?: string;
};

export interface OrganizationRegisterErrors {
  name?: string;
  slug?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function validateLoginForm(values: LoginFormValues): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!values.email.trim()) {
    errors.email = "กรุณากรอก Email";
  } else if (!isValidEmail(values.email)) {
    errors.email = "รูปแบบ Email ไม่ถูกต้อง";
  }

  if (!values.password.trim()) {
    errors.password = "กรุณากรอก Password";
  } else if (values.password.length < 8) {
    errors.password = "Password ต้องมีอย่างน้อย 8 ตัวอักษร";
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateRegisterForm(
  values: OrganizationRegisterFormType,
): OrganizationRegisterErrors {
  const errors: OrganizationRegisterErrors = {};

  if (!values.email.trim()) {
    errors.email = "กรุณากรอก Email";
  } else if (!isValidEmail(values.email)) {
    errors.email = "รูปแบบ Email ไม่ถูกต้อง";
  }

  if (!values.password.trim()) {
    errors.password = "กรุณากรอก Password";
  } else if (values.password.length < 8) {
    errors.password = "Password ต้องมีอย่างน้อย 8 ตัวอักษร";
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "กรุณายืนยัน Password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password ไม่ตรงกัน";
  }

  return errors;
}
