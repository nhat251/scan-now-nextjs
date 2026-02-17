import defaultAxios from "axios";

export const axiosBasic = defaultAxios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
  },
});

axiosBasic.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosBasic.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
