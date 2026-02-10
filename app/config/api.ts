import { headers } from "next/headers";
import { en } from "zod/locales";

export const apiConfig = {
    unsplash: {
        baseUrl: "https://api.unsplash.com",
        timeout: 10000,
        retryCount: 2,
        accessKey: process.env.ATTRACTION_API_KEY || "",
        endpoints: {
            search: "/search/photos",
            random: "/photos/random",
            photoDetail: (id: string) => `/photos/${id}`,
        },
    },

    pexels: {
        baseUrl: "https://api.pexels.com/v1",
        timeout: 10000,
        retryCount: 2,
        accessKey: process.env.ATTRACTION_API_KEY || "",
    },

    amap: {
        baseUrl: "https://restapi.amap.com/v3",
        timeout: 10000,
        retryCount: 2,
        endpoint:{
            geocode: "/geocode/geo",
            placeAround: "/place/around",
            placeSearch: "/place/text",
        },
        apiKey: process.env.AMAP_API_KEY || "",
    },

    ipLocation: {
        baseUrl: "https://ipapi.co",
        timeout: 5000,
        endpoint: "/json",
    },
} as const;

/**
 * API 请求默认配置
 */
export const defaultRequestConfig = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    timeout: 10000,
};

/**
 * 缓存配置策略
 */
export const cacheConfig = {
    attractions: {
        list: 60 * 5,
        detail: 60 * 30, 
    },

    blog: {
        list: 60 * 60,
        detail: 60 * 60 * 24,
    },
};