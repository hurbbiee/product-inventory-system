"use client"

import * as React from "react"
import { Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

type AuthMode = "signin" | "signup"

export default function LoginPage() {
  const [mode, setMode] = React.useState<AuthMode>("signin")
  const isSignUp = mode === "signup"

  return (
    <main className="min-h-screen bg-muted/50 p-3 sm:p-6">
      <section className="relative mx-auto min-h-[760px] w-full max-w-6xl overflow-hidden rounded-[28px] border bg-background shadow-2xl">
        <div className="absolute left-1/2 top-5 z-30 flex -translate-x-1/2 rounded-full border bg-background/80 p-1 shadow-lg backdrop-blur-xl">
          <Button
            type="button"
            size="sm"
            variant={mode === "signin" ? "default" : "ghost"}
            className="rounded-full px-5"
            onClick={() => setMode("signin")}
          >
            Sign in
          </Button>

          <Button
            type="button"
            size="sm"
            variant={mode === "signup" ? "default" : "ghost"}
            className="rounded-full px-5"
            onClick={() => setMode("signup")}
          >
            Sign up
          </Button>
        </div>

        {/* ฝั่ง Visual: เลื่อนจากซ้ายไปขวา */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 z-10 hidden w-1/2 overflow-hidden bg-zinc-950 p-14 text-white",
            "transition-[transform,border-radius] duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:block",
            isSignUp
              ? "translate-x-full rounded-l-[42px]"
              : "translate-x-0 rounded-r-[42px]"
          )}
        >
          <div
            className={cn(
              "absolute inset-x-14 top-20 transition-all duration-500",
              isSignUp
                ? "-translate-y-5 opacity-0"
                : "translate-y-0 opacity-100"
            )}
          >
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70">
              Workspace access
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.05em]">
              Welcome back.
              <br />
              Let&apos;s continue.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-white/60">
              เข้าสู่ระบบเพื่อกลับไปจัดการสินค้า ลูกค้า และรายงานทั้งหมดใน
              workspace ของคุณ
            </p>
          </div>

          <div
            className={cn(
              "absolute inset-x-14 top-20 transition-all duration-500",
              isSignUp
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            )}
          >
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70">
              Start your workspace
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-[-0.05em]">
              Create once.
              <br />
              Scale without chaos.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-white/60">
              สร้างบัญชีใหม่ แล้วเริ่มต้นระบบจัดการธุรกิจที่เรียบง่ายและพร้อมโตไปกับทีม
            </p>
          </div>

          <div
            className={cn(
              "absolute bottom-12 left-12 right-12 h-72 rounded-[26px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl",
              "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
              isSignUp ? "rotate-1" : "-rotate-1"
            )}
          >
            <div className="h-full overflow-hidden rounded-2xl bg-slate-50 text-slate-900">
              <div className="flex h-12 items-center justify-between border-b px-4">
                <div className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-slate-300" />
                  <span className="size-2 rounded-full bg-slate-300" />
                  <span className="size-2 rounded-full bg-slate-300" />
                </div>
                <div className="h-2.5 w-24 rounded-full bg-slate-200" />
              </div>

              <div className="grid h-[calc(100%-3rem)] grid-cols-[92px_1fr]">
                <aside className="space-y-3 border-r bg-slate-100 p-3">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2.5 rounded-full bg-slate-200"
                      style={{ width: `${82 - index * 6}%` }}
                    />
                  ))}
                </aside>

                <div className="p-5">
                  <div className="mb-5 h-3 w-32 rounded-full bg-slate-200" />

                  <div className="grid grid-cols-3 gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-16 rounded-xl border bg-white shadow-sm"
                      />
                    ))}
                  </div>

                  <div className="mt-4 h-24 rounded-xl border bg-gradient-to-t from-indigo-100 to-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ฝั่ง Form: เลื่อนสวนกับฝั่ง Visual */}
        <div
          className={cn(
            "absolute inset-y-0 left-0 grid w-full place-items-center px-6 pb-10 pt-24",
            "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)] lg:left-1/2 lg:w-1/2 lg:px-14",
            isSignUp ? "lg:-translate-x-full" : "lg:translate-x-0"
          )}
        >
          <div className="relative min-h-[570px] w-full max-w-md">
            <SignInForm
              active={!isSignUp}
              onSwitch={() => setMode("signup")}
            />

            <SignUpForm
              active={isSignUp}
              onSwitch={() => setMode("signin")}
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function SignInForm({
  active,
  onSwitch,
}: {
  active: boolean
  onSwitch: () => void
}) {
  return (
    <form
      className={cn(
        "absolute inset-0 flex flex-col justify-center transition-all duration-500",
        active
          ? "translate-x-0 opacity-100"
          : "pointer-events-none -translate-x-8 opacity-0"
      )}
      onSubmit={(event) => event.preventDefault()}
    >
      <AuthHeader
        title="Welcome back 👋"
        description="เข้าสู่ระบบเพื่อดำเนินการต่อ"
      />

      <SocialButtons />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">หรือใช้อีเมล</span>
        <Separator className="flex-1" />
      </div>

      <div className="space-y-4">
        <Field
          id="login-email"
          label="อีเมล"
          type="email"
          placeholder="you@example.com"
        />

        <Field
          id="login-password"
          label="รหัสผ่าน"
          type="password"
          placeholder="••••••••"
        />
      </div>

      <div className="my-5 flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-muted-foreground">
          <input type="checkbox" className="size-4 rounded border" />
          จำฉันไว้
        </label>

        <Button type="button" variant="link" className="h-auto p-0">
          ลืมรหัสผ่าน?
        </Button>
      </div>

      <Button type="submit" className="w-full">
        เข้าสู่ระบบ
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        ยังไม่มีบัญชี?{" "}
        <Button
          type="button"
          variant="link"
          className="h-auto p-0"
          onClick={onSwitch}
        >
          สร้างบัญชี
        </Button>
      </p>
    </form>
  )
}

function SignUpForm({
  active,
  onSwitch,
}: {
  active: boolean
  onSwitch: () => void
}) {
  return (
    <form
      className={cn(
        "absolute inset-0 flex flex-col justify-center transition-all duration-500",
        active
          ? "translate-x-0 opacity-100"
          : "pointer-events-none translate-x-8 opacity-0"
      )}
      onSubmit={(event) => event.preventDefault()}
    >
      <AuthHeader
        title="Create account ✨"
        description="เริ่มต้น workspace ใหม่ของคุณ"
      />

      <SocialButtons />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">หรือสมัครด้วยอีเมล</span>
        <Separator className="flex-1" />
      </div>

      <div className="space-y-4">
        <Field
          id="signup-name"
          label="ชื่อ"
          type="text"
          placeholder="ชื่อของคุณ"
        />

        <Field
          id="signup-email"
          label="อีเมล"
          type="email"
          placeholder="you@example.com"
        />

        <Field
          id="signup-password"
          label="รหัสผ่าน"
          type="password"
          placeholder="อย่างน้อย 8 ตัวอักษร"
        />
      </div>

      <Button type="submit" className="mt-6 w-full">
        สร้างบัญชี
      </Button>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        มีบัญชีอยู่แล้ว?{" "}
        <Button
          type="button"
          variant="link"
          className="h-auto p-0"
          onClick={onSwitch}
        >
          เข้าสู่ระบบ
        </Button>
      </p>
    </form>
  )
}

function AuthHeader({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="mb-7 text-center">
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button type="button" variant="outline">
        <svg
          viewBox="0 0 24 24"
          className="mr-2 size-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M21.6 12.23c0-.71-.06-1.24-.19-1.79H12v3.26h5.52a4.68 4.68 0 0 1-2.05 3.08l-.02.11 2.97 2.3.2.02c1.82-1.68 2.98-4.15 2.98-6.98Z"
          />
          <path
            fill="currentColor"
            d="M12 22c2.7 0 4.96-.89 6.62-2.42l-3.15-2.43c-.84.57-1.97.97-3.47.97a6.02 6.02 0 0 1-5.7-4.16l-.11.01-3.09 2.39-.04.1A10 10 0 0 0 12 22Z"
          />
          <path
            fill="currentColor"
            d="M6.3 13.96a6.15 6.15 0 0 1-.33-1.96c0-.68.12-1.34.32-1.96v-.12L3.16 7.49l-.1.05A10 10 0 0 0 2 12c0 1.6.38 3.12 1.06 4.46l3.24-2.5Z"
          />
          <path
            fill="currentColor"
            d="M12 5.88c1.88 0 3.15.81 3.88 1.49l2.8-2.73C16.96 3.04 14.7 2 12 2a10 10 0 0 0-8.94 5.54l3.23 2.5A6.05 6.05 0 0 1 12 5.88Z"
          />
        </svg>
        Google
      </Button>

      <Button type="button" variant="outline">
        <Github className="mr-2 size-4" />
        GitHub
      </Button>
    </div>
  )
}

function Field({
  id,
  label,
  type,
  placeholder,
}: {
  id: string
  label: string
  type: React.HTMLInputTypeAttribute
  placeholder: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}
