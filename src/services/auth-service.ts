import authApi, { endpoints } from "@/lib/axios/authApi";
import { LoginData } from "@/types";
export const AuthService = {


    login: async (data: LoginData): Promise<string> => {
        try {
            const response = await authApi.post(endpoints.auth.signIn, data);
            const token = response.data.tokens.access;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('role', JSON.stringify(response.data.user));
            return token;
        } catch (error) {
            console.error("Login failed", error);
            throw new Error("Login failed. Please check your credentials and try again.");
        }
    },


    // register: async (data: RegisterData): Promise<void> => {
    //     try {
    //         const res=await apiClient.post(endpoints.auth.signUp, data);
    //         const token = res.data.access;
    //         localStorage.setItem('accessToken', token);
    //         localStorage.setItem('role', 'user');
    //         return token;
    //     } catch (error) {
    //         console.error("Registration failed", error);
    //         throw new Error("Registration failed. Please try again later.");
    //     }
    // },


    logout: (): void => {
        localStorage.removeItem('role');
        localStorage.removeItem('accessToken');
       
        
    },


    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('accessToken');
    },
};

export default AuthService;
