
import * as zod from "zod";


export const loginSchema = zod.object({
  email: zod.email(),
  password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum eight characters, at least one letter and one number"),
 

})
export type LoginFormData = zod.infer<typeof loginSchema>;