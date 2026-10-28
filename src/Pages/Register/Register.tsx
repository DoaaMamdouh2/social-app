import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "iconsax-reactjs";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { registerSchema, type RegisterFormData } from "./register.validation";
import { sendUserRegister } from "./register.api";
import { useNavigate } from "react-router";

function Register() {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "" as "male" | "female", 
      password: "",
      rePassword: "",
    },
    mode: "all",
    resolver: zodResolver(registerSchema),
  });

  const navigation = useNavigate();

  async function handleUserSubmit(userData: RegisterFormData) {
    toast.promise(sendUserRegister(userData), {
      loading: "Please wait...",
      success: function (message) {
        reset();
        navigation("/login");
        return <p className="text-base  text-green-500">{message}</p>;
      },
      error: function (error: Error) {
        return (
          <p className="text-base  text-red-500">{error.message}</p>
        );
      },
    });
  }
  return (
    <Form
      className="w-full max-w-2xl mx-auto bg-white shadow-2xl shadow-rose-200/50 p-10 rounded-3xl flex flex-col gap-4 mt-28 mb-16 fade-up"
      onSubmit={handleSubmit(handleUserSubmit)}
    >
      <h1 className="text-5xl text-center text-ink">Register</h1>
      {/* Name */}
      <TextField isRequired type="text" isInvalid={!!errors.name}>
        <Label>Name</Label>
        <Input
          {...register("name")}
          placeholder="Enter your name"
          className={`${!errors.name && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.name && (
        <span className="text-red-500 text-sm">{errors.name?.message}</span>
      )}
      {/* User Name */}
      <TextField isRequired type="text" isInvalid={!!errors.username}>
        <Label>User Name</Label>
        <Input
          {...register("username")}
          placeholder="Enter your user name"
          className={`${!errors.username && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.username && (
        <span className="text-red-500 text-sm">{errors.username?.message}</span>
      )}

      {/* Email */}
      <TextField isRequired type="email" isInvalid={!!errors.email}>
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="Enter your email"
          className={`${!errors.email && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.email && (
        <span className="text-red-500 text-sm">{errors.email?.message}</span>
      )}
      {/* Password */}
      <TextField isRequired type="password" isInvalid={!!errors.password}>
        <Label>Password</Label>
        <Input
          {...register("password")}
          placeholder="Enter your password"
          className={`${!errors.password && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password?.message}</span>
      )}

      {/* Confirm Password */}
      <TextField isRequired type="password" isInvalid={!!errors.rePassword}>
        <Label>Confirm Password</Label>
        <Input
          {...register("rePassword")}
          placeholder="Confirm your password"
          className={`${!errors.rePassword && "focus:ring-main-color"}  `}
        />
      </TextField>
      {errors.rePassword && (
        <span className="text-red-500 text-sm">
          {errors.rePassword?.message}
        </span>
      )}
      {/* Birth Date */}
      <TextField isRequired type="date" isInvalid={!!errors.dateOfBirth}>
        <Label>Birth Date</Label>
        <Input
          {...register("dateOfBirth")}
          placeholder="Enter your birth date"
          className={`${!errors.dateOfBirth && "focus:ring-main-color"}  `}
        />
      </TextField>

      {errors.dateOfBirth && (
        <span className="text-red-500 text-sm">
          {errors.dateOfBirth?.message}
        </span>
      )}
      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Select one"
            value={field.value || null}
            onChange={(key) => field.onChange(key)}
            onBlur={field.onBlur}
            isInvalid={!!errors.gender}
          >
            <Label>Gender</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="male" textValue="Male">
                  Male
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="female" textValue="Female">
                  Female
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
          </Select>
        )}
      />

      <div className="flex flex-row gap-2">
        <Button
          type="submit"
          className="flex-1 bg-main-color text-white shadow-md shadow-rose-300/40 transition-transform duration-200 hover:scale-105"
          isPending={isSubmitting}
        >
          {isSubmitting ? (
            <Spinner color="current" size="lg" />
          ) : (
            <>
              <Check />
              Submit
            </>
          )}
        </Button>
        <Button
          type="reset"
          className="flex-1 bg-[#b8aeb0] text-white shadow-md shadow-stone-300/40 transition-transform duration-200 hover:scale-105"
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}
export default Register;
