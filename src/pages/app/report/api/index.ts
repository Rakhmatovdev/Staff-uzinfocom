import authApi, { endpoints } from "@/lib/axios/authApi";

export const docsService = {
  getDocs: async ({ page = 1, search = "" }) => {
    const response = await authApi.get(endpoints.topics, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },
};
export const serviseEmloyes = {
  getEmloyes: async ({ page = 1, search = "" }) => {
    const response = await authApi.get(endpoints.employ, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },
};
export const servisePayment = {
  getPayment: async ({ page = 1, search = "" }) => {
    const response = await authApi.get(endpoints.payment, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },
};
export const serviseExpirence = {
  getExpirence: async ({ page = 1, search = "" }) => {
    const response = await authApi.get(endpoints.expirence, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },
};
export const serviseProject = {
  getProject: async ({ page = 1, search = "" }) => {
    const response = await authApi.get(endpoints.projects, {
      params: {
        page,
        search,
      },
    });
    return response.data;
  },
};
