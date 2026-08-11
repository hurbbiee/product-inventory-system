'use client'

import BuildingIcon from "../../../icons/buildng-icon"
import DashboardIcon from "../../../icons/dashboard-icon"
import { LoginMode } from "../../type/login-type"

interface Props {
    mode: LoginMode
    onChange: (mode: LoginMode) => void
}
export default function ModeToggle({
    mode,
    onChange,
}: Props) {
    return (
        <div className="relative grid grid-cols-2 rounded-xl border bg-muted p-1">
            <span
                aria-hidden="true"
                className={[
                    "absolute left-1 top-1 h-10 w-[calc(50%-6px)] rounded-lg border bg-background shadow-sm",
                    "transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)]",
                    mode === "organization"
                        ? "translate-x-[calc(100%+4px)]"
                        : "translate-x-0",
                ].join(" ")}
            />

            <button
                type="button"
                className={[
                    "relative z-10 flex h-10 items-center justify-center gap-2 rounded-lg text-sm transition-colors",
                    mode === "dashboard"
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground",
                ].join(" ")}
                onClick={() => onChange("dashboard")}
            >
                <DashboardIcon />
                Dashboard
            </button>

            <button
                type="button"
                className={[
                    "relative z-10 flex h-10 items-center justify-center gap-2 rounded-lg text-sm transition-colors",
                    mode === "organization"
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground",
                ].join(" ")}
                onClick={() => onChange("organization")}
            >
                <BuildingIcon />
                Organization
            </button>
        </div>
    )
}
