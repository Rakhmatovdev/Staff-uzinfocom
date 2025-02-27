import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import AuthService from "@/services/auth-service.ts";
import { LoginData } from "@/types";
import { notification } from "antd";
import heroBg from "../../../public/hero-bg.jpg";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form submission
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      setLoading(true);
      const token = await AuthService.login(data);
      if (token) {
        setLoading(false);
        navigate("/user");
        reset();
      }
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      console.error(error.message);
      notification.error({ message: error.message });
    }
  };

  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate("/");
    }
  }, []);
  return (
    <section
      className=" h-screen flex justify-center items-center "
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="flex flex-col  items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[360px] sm:w-full">
        <div className="w-full   rounded-xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 wrapper space-y-4 md:space-y-6 sm:p-8">
            <h2>Login Form</h2>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="input-field">
                <label htmlFor="username" className="hidden">
                  Username
                </label>
                <input
                  type="text"
                  {...register("username", {
                    required: "This field is required",
                  })}
                  id="username"
                  placeholder="Username..."
                />
                {errors.username && (
                  <span className="text-rose-500">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="input-field">
                <label htmlFor="password" className="hidden">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password..."
                  {...register("password", {
                    required: "This field is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-rose-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="forget">
                <label htmlFor="remember">
                  <input type="checkbox" id="remember" />
                  <p>Remember me</p>
                </label>
                <a href="#">Forgot password?</a>
              </div>
              <div></div>
              <button
                type="submit"
                className={`${loading && "opacity-50"}`}
                disabled={loading}
              >
                Sign in
              </button>
              <div className="register">
                <p>
                  Don't have an account? <a href="#">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
