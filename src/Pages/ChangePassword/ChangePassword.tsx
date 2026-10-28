import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { changePasswordSchema, type ChangePasswordFormData } from "./changePassword.validation";
import useChangePassword from "../../Hook/useChangePassword/useChangePassword";

function ChangePassword() {
  const { handleSubmit, register, reset, formState: { errors } } = useForm<ChangePasswordFormData>({
    defaultValues: {
      password: "",
      newPassword: "",
      rePassword: ""
    },
    mode: "all",
    resolver: zodResolver(changePasswordSchema)
  });

  const { mutate, isPending } = useChangePassword(function () {
    reset();
  });

  function handleUserSubmit(userData: ChangePasswordFormData) {
    mutate({ password: userData.password, newPassword: userData.newPassword });
  }

  return (
    <Form
      className="w-full max-w-2xl mx-auto bg-white shadow-2xl shadow-rose-200/50 p-10 rounded-3xl flex flex-col gap-4 mt-28 mb-16 fade-up"
      onSubmit={handleSubmit(handleUserSubmit)}
    >
      <h1 className="text-5xl text-center">Change Password</h1>

      {/* Current Password */}
      <TextField isRequired type="password" isInvalid={!!errors.password}>
        <Label>Current Password</Label>
        <Input
          {...register("password")}
          placeholder="Enter your current password"
          className={`${!errors.password && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>}

      {/* New Password */}
      <TextField isRequired type="password" isInvalid={!!errors.newPassword}>
        <Label>New Password</Label>
        <Input
          {...register("newPassword")}
          placeholder="Enter your new password"
          className={`${!errors.newPassword && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword?.message}</span>}

      {/* Confirm New Password */}
      <TextField isRequired type="password" isInvalid={!!errors.rePassword}>
        <Label>Confirm New Password</Label>
        <Input
          {...register("rePassword")}
          placeholder="Confirm your new password"
          className={`${!errors.rePassword && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.rePassword && <span className="text-red-500 text-sm">{errors.rePassword?.message}</span>}

      <div className="flex flex-row gap-3">
        <Button type="submit" className="flex-1 bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105" isPending={isPending}>
          {isPending ? <Spinner color="current" size="lg" /> : <><Check />
          Submit</>}
        </Button>
        <Button type="reset" className="flex-1 bg-[#B8AEB0] text-white shadow-md shadow-stone-300/40 transition-transform duration-200 hover:scale-105">
          Reset
        </Button>
      </div>
    </Form>
  );
}
export default ChangePassword;