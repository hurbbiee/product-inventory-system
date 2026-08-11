"use client";

import React from "react";
import { LoginMode } from "../type/login-type";
import VisualPanel from "./sections/visual-panel";
import ModeToggle from "./sections/mode-toggle";
import RegisterSheet from "./sections/register-sheet";
import { AuthService } from "../service/auth";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthLoginRequestInterface } from "../type/auth-request";
import {
  LoginFormErrors,
  validateLoginForm,
} from "@/lib/validators/auth-validator";
import FieldInput from "@/components/ui/field-input";
import { useRouter } from "next/navigation";
import { OrganizationService } from "../../organization/service/organization-service";

export default function MainLoginPage() {
  const route = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const [mode, setMode] = React.useState<LoginMode>("dashboard");
  const isOrganization = mode === "organization";
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const [shake, serShake] = React.useState<LoginFormErrors>({});
  const [form, setForm] = React.useState<AuthLoginRequestInterface>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<LoginFormErrors>({});

  const authLoginMutation = useMutation({
    mutationFn: AuthService.loginOrganization,

    onSuccess: async (data) => {
      const { accessToken, organization, user } = data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("organization", JSON.stringify(organization));
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("เข้าสู่ระบบสำเร็จ", { position: "bottom-right" });
      route.replace("/dashboard");
    },

    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการเข้าสู่ระบบ";

      toast.error(message, {
        position: "bottom-right",
      });
    },
  });

  const registerOrganization = useMutation({
    mutationFn: OrganizationService.register,

    onSuccess: async (data) => {
      setRegisterOpen(false);
      toast.success(`สร้าง Organization ${data.organization.name} สำเร็จ`, {
        position: "bottom-right",
      });
      console.log("register success: ", data);
    },

    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในสร้าง Organization";

      toast.error(message, {
        position: "bottom-right",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);

    setErrors(validationErrors);
    serShake(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    authLoginMutation.mutate(form);
  };

  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setRegisterOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!shake) return;

    const timer = setTimeout(() => {
      serShake({});
    }, 350);

    return () => clearTimeout(timer);
  }, [shake]);

  return (
    <>
      <main className="grid min-h-screen place-items-center overflow-hidden bg-muted/50 p-3 sm:p-6">
        <section
          className={[
            "relative min-h-190 w-full max-w-6xl overflow-hidden rounded-[30px] border bg-background shadow-2xl",
            "transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
            mounted
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-8 scale-[0.985] opacity-0",
          ].join(" ")}
        >
          <VisualPanel mode={mode} mounted={mounted} />

          <section
            className={[
              "absolute inset-y-0 left-0 grid w-full place-items-center bg-background px-6 pb-10 pt-12",
              "transition-all delay-100 duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
              "lg:left-1/2 lg:w-1/2 lg:px-14",
              mounted
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0",
            ].join(" ")}
          >
            <div className="relative min-h-146.25 w-full max-w-md">
              <ModeToggle mode={mode} onChange={setMode} />

              <header className="mt-9 text-center">
                <h1
                  key={`${mode}-title`}
                  className="animate-[fade-up_.4s_ease-out] text-3xl font-semibold tracking-tight"
                >
                  {isOrganization ? "Organization access " : "Welcome"}
                </h1>
                <p
                  key={`${mode}-description`}
                  className="mt-2 animate-[fade-up_.45s_ease-out] text-sm text-muted-foreground"
                >
                  {isOrganization
                    ? "เข้าสู่พื้นที่ทำงานร่วมกับทีมของคุณ"
                    : "เข้าสู่ Dashboard ส่วนตัวของคุณ"}
                </p>
              </header>
              <form className="mt-3" onSubmit={handleSubmit}>
                {!isOrganization ? (
                  <div className="space-y-3">
                    <FieldInput
                      shake={shake.email}
                      id="email"
                      label="อีเมล"
                      type="text"
                      placeholder="example@email.com"
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
                  </div>
                ) : (
                  <div
                    className={[
                      "overflow-hidden transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
                      isOrganization
                        ? "mb-4 max-h-24 translate-y-0 opacity-100"
                        : "max-h-0 -translate-y-3 opacity-0",
                    ].join(" ")}
                  ></div>
                )}

                <div
                  className={[
                    "overflow-hidden transition-all duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
                    isOrganization
                      ? "mb-4 max-h-24 translate-y-0 opacity-100"
                      : "max-h-0 -translate-y-3 opacity-0",
                  ].join(" ")}
                >
                  asdasd
                </div>

                <div className="space-y-4">
                  {/* <Field
                                        id="email"
                                        label="อีเมล"
                                        type="email"
                                        placeholder="you@example.com"
                                    />
                                    <Field
                                        id="password"
                                        label="รหัสผ่าน"
                                        type="password"
                                        placeholder="••••••••"
                                    /> */}
                </div>

                <div className="my-5 flex items-center justify-end gap-3 text-sm">
                  <button
                    type="button"
                    className="font-medium underline-offset-4 hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </button>
                </div>

                <Button
                  type="submit"
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-all hover:-translate-y-0.5 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  disabled={authLoginMutation.isPending}
                >
                  {authLoginMutation.isPending
                    ? "กำลังเข้าสู่ระบบ..."
                    : isOrganization
                      ? "เข้าสู่ Organization"
                      : "เข้าสู่ Dashboard"}
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                ยังไม่มีบัญชี?{" "}
                <button
                  type="button"
                  className="font-semibold text-foreground underline-offset-4 hover:underline"
                  onClick={() => setRegisterOpen(true)}
                >
                  Register
                </button>
              </p>
            </div>

            <RegisterSheet
              isPending={registerOrganization.isPending}
              open={registerOpen}
              onClose={() => setRegisterOpen(false)}
              onSubmit={(val) => registerOrganization.mutate(val)}
            />
          </section>
        </section>
      </main>
    </>
  );
}
