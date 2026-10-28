import * as zod from "zod";

export const changePasswordSchema = zod.object({
  password: zod.string().min(1, "Current password is required"),
  newPassword: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum eight characters, at least one letter and one number"),
  rePassword: zod.string().min(1, "Confirm your new password"),
}).refine(function ({ newPassword, rePassword }) {
  if (newPassword === rePassword) {
    return true;
  }
  return false;
}, {
  error: "Passwords do not match",
  path: ["rePassword"]
});

export type ChangePasswordFormData = zod.infer<typeof changePasswordSchema>;