import { Button, Form, Input, Label, TextField, Spinner } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginSchema, type LoginFormData } from "./login.validation";
import { sendUserLogin } from "./login.api";
import { useForm } from "react-hook-form";
import { Check } from "iconsax-reactjs";
import { useContext } from "react";
import { UserTokenProvider } from "../../Components/AuthUserContext/AuthUserContext";

function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver: zodResolver(loginSchema),
  });

  const navigation = useNavigate();
  const { setUserData } = useContext(UserTokenProvider);

  async function handleUserSubmit(userData: LoginFormData) {
    await toast.promise(sendUserLogin(userData), {
      loading: "Please wait...",
      success: function (response) {
        localStorage.setItem("user_token", response.data.token);
        setUserData(response.data.user);

        reset();
        navigation("/");
        return (
          <p className="text-base text-green-500">
            {response.message}
          </p>
        );
      },
      error: function (x) {
        
        return <p className="text-base text-red-500">{x}</p>;
      },
    });
  }
  return (
    <Form
      className="w-full max-w-2xl mx-auto bg-white shadow-2xl p-10 rounded-3xl flex flex-col gap-4 my-16"
      onSubmit={handleSubmit(handleUserSubmit)}
    >
      <h1 className="text-5xl text-center">Login</h1>

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
          className="flex-1 bg-[#B8AEB0] text-white shadow-md shadow-stone-300/40 transition-transform duration-200 hover:scale-105"
        >
          Reset
        </Button>
      </div>
    </Form>
  );
}
export default Login;
