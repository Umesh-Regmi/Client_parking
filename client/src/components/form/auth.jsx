import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthMutation } from "../../hooks/useAuthMutation";
import { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function AuthForm({ type = "login" }) {
  const isLogin = type === "login";

  // Show/hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Yup validation schema
  const schema = yup.object({
    ...(isLogin
      ? {}
      : {
          name: yup.string().required("Name is required").min(3),
          confirmPassword: yup
            .string()
            .required("Confirm password is required")
            .oneOf([yup.ref("password")], "Passwords must match"),
        }),
    email: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required").min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate, isPending, error } = useAuthMutation(type);
  console.log(error);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (!isLogin) {
      delete data.confirmPassword;
    }

    mutate(data, {
      onSuccess: (data) => {
        toast.success(`${isLogin ? "Login" : "Register"} successful`);
        console.log("Response data:", data);
        if (type === "") {
          // Redirect to login page after successful registration
          navigate("/login");
        } else {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", data.data.user);
          navigate("/");
        }
      },
    });
  };

  const inputGroupStyle = "flex flex-col  items-start gap-2";
  const labelStyle = " text-sm font-medium text-gray-700";
  const inputStyle =
    "flex-1 w-full text-gray-800 px-4 py-2 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!isLogin && (
        <div>
          <div className={inputGroupStyle}>
            <label className={labelStyle}>Name</label>
            <input
              placeholder="john doe"
              type="text"
              {...register("name")}
              className={inputStyle}
            />
          </div>
          {errors.name && (
            <p className="text-sm text-red-600  text-start">
              {errors.name.message}
            </p>
          )}
        </div>
      )}

      <div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>Email</label>
          <input
            placeholder="example@gmail.com"
            type="text"
            {...register("email")}
            className={inputStyle}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600 text-start">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <div className={inputGroupStyle}>
          <label className={labelStyle}>Password</label>
          <div className="relative flex-1 w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={`${inputStyle} w-full`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-2 text-sm text-gray-600"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {!isLogin && (
        <div>
          <div className={inputGroupStyle}>
            <label className={labelStyle}>Confirm</label>
            <div className="relative flex-1 w-full">
              <input
                placeholder="Confirm Password"
                type={showConfirm ? "text" : "password"}
                {...register("confirmPassword")}
                className={`${inputStyle} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((prev) => !prev)}
                className="absolute inset-y-0 right-2 text-sm text-gray-600"
              >
                {showConfirm ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-600 ">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-indigo-500 font-semibold text-white rounded hover:bg-blue-700"
      >
        {isPending ? "Submitting..." : isLogin ? "Login" : "Register"}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error.response.data.message ?? "Something went wrong"}
        </p>
      )}
    </form>
  );
}
