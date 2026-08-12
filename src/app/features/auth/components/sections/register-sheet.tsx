"use client";

import FieldInput from "@/components/ui/field-input";
import React from "react";
import { OrganizationRegisterFormType } from "../../type/organization-request";
import {
  OrganizationRegisterErrors,
  validateRegisterForm,
} from "@/lib/validators/auth-validator";
import { Button } from "@/components/ui/button";
import { CreateOrganizationRequestType } from "@/app/features/organization/type/create-organization";

interface Props {
  open: boolean;
  onClose: () => void;
  isPending: boolean;
  onSubmit: (val: CreateOrganizationRequestType) => void;
}

const initialForm: OrganizationRegisterFormType = {
  email: "",
  password: "",
  slug: "",
  name: "",
  confirmPassword: "",
};
export default function RegisterSheet({
  open,
  onClose,
  isPending,
  onSubmit,
}: Props) {
  const [form, setForm] =
    React.useState<OrganizationRegisterFormType>(initialForm);

  const [shake, setShake] = React.useState<OrganizationRegisterErrors>({});
  const [errors, setErrors] = React.useState<OrganizationRegisterErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(form);

    setErrors(validationErrors);
    setShake(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload: CreateOrganizationRequestType = {
      name: form.name,
      slug: form.slug,
      email: form.email,
      password: form.password,
    };

    onSubmit(payload);
  };

  React.useEffect(() => {
    function resetForm() {
      setForm(initialForm);
      setErrors({});
      setShake({});
    }
    if (!open) {
      resetForm();
    }
  }, [open]);
  return (
    <>
      <div
        className={[
          "absolute inset-0 z-30",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="ปิดหน้าสมัครสมาชิก"
          className={[
            "absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          ].join(" ")}
          onClick={onClose}
        />

        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-title"
          className={[
            "absolute inset-x-0 bottom-0 min-h-[86%] rounded-t-[26px] border-t bg-background p-7",
            "shadow-[0_-24px_70px_rgba(15,23,42,.20)]",
            "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
            open ? "translate-y-0" : "translate-y-[104%]",
          ].join(" ")}
        >
          <div className="mx-auto -mt-3 mb-6 h-1.5 w-11 rounded-full bg-muted-foreground/25" />

          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2
                id="register-title"
                className="text-2xl font-semibold tracking-tight"
              >
                Create your Organization
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                สมัครบัญชีและสร้าง Organization แรกของคุณ
              </p>
            </div>

            <button
              type="button"
              aria-label="ปิด"
              className="grid size-10 place-items-center rounded-md border bg-background transition-colors hover:bg-muted"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldInput
                shake={shake.name}
                id="name"
                label="ชื่อ"
                type="text"
                placeholder="กรอกชื่อ"
                value={form.name}
                error={errors.name}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    name: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    name: undefined,
                  }));
                }}
              />
              <FieldInput
                shake={shake.slug}
                id="slug"
                label="ชื่อบริษัท"
                type="text"
                placeholder="กรอกชื่อบริษัท"
                value={form.slug}
                error={errors.slug}
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    slug: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    slug: undefined,
                  }));
                }}
              />
              <div className="sm:col-span-2">
                <FieldInput
                  shake={shake.email}
                  id="email"
                  label="อีเมล"
                  type="text"
                  placeholder="example@gmail.com"
                  value={form.email}
                  error={errors.email}
                  onChange={(value) => {
                    setForm((prev) => ({
                      ...prev,
                      email: value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      email: undefined,
                    }));
                  }}
                />
              </div>
              <FieldInput
                shake={shake.password}
                id="password"
                label="รหัสผ่าน"
                type="password"
                placeholder="กรอกรหัสผ่าน"
                value={form.password}
                error={errors.password}
                showPasswordToggle
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    password: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    password: undefined,
                  }));
                }}
              />

              <FieldInput
                shake={shake.confirmPassword}
                id="confirmPassword"
                label="ยืนยันรหัสผ่าน"
                type="password"
                placeholder="กรอกรยืนยันหัสผ่าน"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                showPasswordToggle
                onChange={(value) => {
                  setForm((prev) => ({
                    ...prev,
                    confirmPassword: value,
                  }));

                  setErrors((prev) => ({
                    ...prev,
                    confirmPassword: undefined,
                  }));
                }}
              />
            </div>

            <Button
              type="submit"
              className="inline-flex mt-3 h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              disabled={isPending}
            >
              {isPending ? "กำลังเข้าสู่ระบบ..." : "สมัครสมาชิก"}
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="size-4"
      aria-hidden="true"
    >
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
