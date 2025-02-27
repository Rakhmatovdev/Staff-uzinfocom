import UBreadcrumb from "@/components/ui/UBreadcrumb";
import UInput from "@/components/ui/UInput";
import userService from "@/services/user-service";
import { TPassword } from "@/types";
import { itemPassword, pasCharacters, pasTitle } from "@/types/data";
import { EyeOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
const PasswordChange = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["change password"],
    mutationFn: userService.confirm,
  });

  const onSubmit: SubmitHandler<TPassword> = (data) => {
    mutate(data);
    reset();
  };
  return (
    <div className="soh">
      <div className="mt-7">
        <form
          className="flex border  flex-col  rounded "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="border-b w-full sm:p-4 p-2  sm:font-normal   gap-2 sm:gap-4 ">
            <p className="text-xs sm:text-base ">{pasTitle}</p>
          </div>

          <div className="fff sm:gap-20 p-2 sm:p-4">
            <p className="utext  sm:pr-[8px]">
              Your Password <span className="text-rose-500">*</span>
            </p>
            <UInput
              className="sm:w-[200px] sm:h-9 "
              type="password"
              name="password"
              control={control}
              suffix={<EyeOutlined />}
              required
            />
          </div>
          <div className="">
            <div className="fff  sm:gap-20 p-2 sm:p-4 pb-0">
              <p className="utext sm:pr-[9px]">
                New Password <span className="text-rose-500">*</span>
              </p>
              <div className="">
                <UInput
                  className="sm:w-[200px] sm:h-9 "
                  type="password"
                  name="confirm_password"
                  control={control}
                  suffix={<EyeOutlined />}
                  required
                />
                <div className="mt-2">
                  {pasCharacters &&
                    pasCharacters.map((pass) => (
                      <li key={pass.id} className="text-slate-500 text-[12px]">
                        {pass.character}
                      </li>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className=" sm:px-3 px-2 py-1 text-sm sm:text-base sm:py-2 bg-blue-500 font-bold text-white rounded w-44 ml-2 mb-2 sm:ml-4 sm:mb-4 hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
