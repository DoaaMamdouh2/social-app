
import * as zod from "zod";


export const registerSchema = zod.object({
  name: zod.string().min(1, "Name is required").regex(/^([a-zA-Z0-9_\s]+)$/, "Enter a valid name"),
  username: zod.string().min(1, "User Name is required").regex(/^[a-zA-Z0-9_-]{3,16}$/, "Enter a valid user name"),
  email: zod.email(),
  password: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum eight characters, at least one letter and one number"),
  rePassword: zod.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must be minimum eight characters, at least one letter and one number"),
  dateOfBirth: zod.string().refine(function (value)  {
              const currentDate = new Date();
              const userDate = new Date(value);
              
              if (currentDate.getFullYear() - userDate.getFullYear()> 21) {
                return true;
              }
              
            },"Invalid birth date"),
  gender: zod.enum(["male", "female"], { message: "Gender must be either male or female" }) // changed

}).refine(function({ password, rePassword })  {
  if (password === rePassword) {
    return true;
  }
  
}, {
  error:"Passwords do not match",
  path: ["rePassword"]
}
)
export type RegisterFormData = zod.infer<typeof registerSchema>;