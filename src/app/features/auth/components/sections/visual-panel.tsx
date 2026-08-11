'use client'

import { LoginMode } from "../../type/login-type"
import DashboardMock from "./dashboard-mock"

interface Props {
    mode: LoginMode
    mounted: boolean
}

export default function VisualPanel({
    mode,
    mounted,
}: Props) {
    const isOrganization = mode === "organization"

    return (
        <>
            <aside
                className={[
                    "absolute inset-y-0 left-0 hidden w-1/2 overflow-hidden rounded-r-[44px] bg-zinc-950 p-14 text-white lg:block",
                    "transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                    mounted ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0",
                ].join(" ")}
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.12),transparent_30%)]" />

                <div className="relative z-10">
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-white/70">
                        Secure workspace access
                    </span>

                    <div key={mode} className="mt-6 animate-[fade-up_.5s_ease-out]">
                        <h2 className="text-5xl font-semibold leading-[1.02] tracking-tighter">
                            {isOrganization ? (
                                <>
                                    One organization.
                                    <br />
                                    Everything connected.
                                </>
                            ) : (
                                <>
                                    Your dashboard.
                                    <br />
                                    Ready when you are.
                                </>
                            )}
                        </h2>

                        <p className="mt-5 max-w-md leading-7 text-white/60">
                            {isOrganization
                                ? "จัดการสมาชิก สิทธิ์การใช้งาน ข้อมูลบริษัท และ workflow ทั้งหมดจากพื้นที่เดียว"
                                : "ดูงานล่าสุด ตัวเลขสรุป และสิ่งที่ต้องจัดการในวันนี้จาก Dashboard ส่วนตัวของคุณ"}
                        </p>
                    </div>
                </div>

                <div
                    className={[
                        "absolute bottom-12 left-12 right-12 h-72 rounded-[28px] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl",
                        "transition-transform duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
                        isOrganization ? "rotate-1" : "-rotate-1",
                    ].join(" ")}
                >

                    <DashboardMock mode={mode} />
                </div>
            </aside>
        </>
    )
}