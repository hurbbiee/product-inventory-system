import { z } from "zod"

export const userLoginFormSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "กรุณากรอกชื่อผู้ใช้หรืออีเมล"),

    password: z
        .string()
        .min(1, "กรุณากรอกรหัสผ่าน")
        .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
})

export type UserFormValues = z.infer<
    typeof userLoginFormSchema
>