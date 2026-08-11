"use client";

import { useState } from "react";
import type { InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "./input";
import { Label } from "./label";

interface FieldInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  label: string;
  error?: string;
  onChange?: (value: string) => void;
  showPasswordToggle?: boolean;
  shake?: string;
}

export default function FieldInput({
  label,
  error,
  id,
  type = "text",
  className,
  onChange,
  showPasswordToggle = false,
  shake,
  ...props
}: FieldInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password" && showPasswordToggle;

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <Label className="text-lg!" htmlFor={id}>
        {label}
      </Label>

      <div className="relative">
        <Input
          id={id}
          type={inputType}
          onChange={(event) => {
            onChange?.(event.target.value);
          }}
          aria-invalid={Boolean(error)}
          className={cn(
            `
            text-lg!
              h-12 rounded-xl
              border-border/70
              bg-background/70
              px-4
              text-lg
              shadow-sm
              transition-all duration-200
              placeholder:text-muted-foreground/60
              hover:border-primary/40
              hover:bg-background
              focus-visible:border-primary
              focus-visible:ring-4
              focus-visible:ring-primary/10
              focus-visible:ring-offset-0
              aria-invalid:border-destructive
              aria-invalid:bg-destructive/5
              aria-invalid:ring-destructive/10
            `,
            error && "border-destructive focus-visible:ring-destructive/20",
            shake && "input-shake",
            isPassword && "pr-12",
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
            className="
              absolute right-3 top-1/2
              -translate-y-1/2
              text-muted-foreground
              transition-colors
              hover:text-foreground
            "
            aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
