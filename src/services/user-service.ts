import authApi, { endpoints } from "@/lib/axios/authApi.ts";
import { TPassword } from "@/types";
import { notification } from "antd";

export const userService = {
    users: async ()=> {
        try {
            const response = await authApi.get(endpoints.users);
            return response.data;
        } catch (error) {
            console.error("Create failed", error);
            throw new Error("Create failed. Please check your credentials and try again.");
        }
    },
    
    confirm: async (data:TPassword)=> {
      try {
          const response = await authApi.post(endpoints.auth.pasReset,data);
          notification.success({message:"Password changed successfully"});
          return response.data;
      } catch (error) {
          console.error("Change Password failed", error);
          throw new Error("Change Password failed. Please check your credentials and try again.");
      }
  },
};

export default userService;
