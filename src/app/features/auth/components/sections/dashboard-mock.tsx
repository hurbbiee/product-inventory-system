'use client'

import { LoginMode } from "../../type/login-type"

interface Props {
    mode: LoginMode
}
export default function DashboardMock({
    mode,
}: Props) {
    const isOrganization = mode === "organization"

    return (
        <div className="h-full overflow-hidden rounded-2xl bg-slate-50 text-slate-900">
            <div className="flex h-12 items-center justify-between border-b px-4">
                <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-slate-300" />
                    <span className="size-2 rounded-full bg-slate-300" />
                    <span className="size-2 rounded-full bg-slate-300" />
                </div>
                <div className="h-2.5 w-24 rounded-full bg-slate-200" />
            </div>

            <div
                key={mode}
                className="h-[calc(100%-3rem)] animate-[fade-up_.45s_ease-out] p-5"
            >
                <div className="mb-5 h-3 w-32 rounded-full bg-slate-200" />

                {isOrganization ? (
                    <div className="grid grid-cols-[1.1fr_.9fr] gap-3">
                        <div className="rounded-xl border bg-white p-3 shadow-sm">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border-b py-2 last:border-b-0"
                                >
                                    <span className="size-8 rounded-full bg-slate-200" />
                                    <span
                                        className="h-2.5 rounded-full bg-slate-200"
                                        style={{ width: `${65 - index * 7}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3">
                            <div className="h-20 rounded-xl border bg-white shadow-sm" />
                            <div className="h-20 rounded-xl border bg-white shadow-sm" />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-3 gap-3">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="h-16 rounded-xl border bg-white shadow-sm"
                                />
                            ))}
                        </div>
                        <div className="mt-4 h-28 rounded-xl border bg-linear-to-t from-indigo-100 to-white" />
                    </>
                )}
            </div>
        </div>
    )
}