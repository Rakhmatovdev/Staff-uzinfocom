/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { notification } from "antd";
import axios from "axios";

const authApi = axios.create({
  baseURL: "https://stuff.201.uz/api/v1",
  timeout: 10000,
});

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      return config;
    }
    return config;
  },
  (error: any) => {
    // @ts-ignore
    notification.error("Response Data:", error?.response?.data);
  }
);

export const endpoints = {
  auth: {
    signIn: "/users/login/", // post
    pasReset: "/users/password-reset/", //post
  },
  users: "/users/data/", //:id get,
  // submit: '/submit-answer/', //:id post
  topics: "/projects/report/employees-projects/", // get
  // upload: '/upload-tests/',  //post
  employ: "/projects/report/employees",
  payment: "/projects/report/project/payment",
  expirence: "/projects/report/employees/experience",
  projects: "/projects/report/projects",
  user: "/user",
};

export default authApi;
