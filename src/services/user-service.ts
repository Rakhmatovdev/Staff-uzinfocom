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
    loc: async ()=> {
        try {
            const response = await fetch(`http://localhost:3000/user`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            // Javob muvaffaqiyatli bo'lsa, ma'lumotlarni qaytaradi
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            return data[0];
          } catch (error) {
            console.error("Ma'lumot olishda xatolik:", error);
            throw new Error("Ma'lumotni olish muvaffaqiyatsiz bo'ldi. Iltimos, qayta urinib ko'ring.");
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
    // profile: async (id:any)=> {
    //     try {
    //         const response = await authApi.get(`${endpoints.profile}${id}/`);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Create failed", error);
    //         throw new Error("Create failed. Please check your credentials and try again.");
    //     }
    // }
};

export default userService;
