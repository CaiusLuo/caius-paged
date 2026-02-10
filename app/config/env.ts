import { z } from "zod";

// ============================================
// 客户端环境变量验证
// ============================================
const clientEnvSchema = z.object({
  // 站点 URL
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  
  // API 基础路径
  NEXT_PUBLIC_API_BASE: z.string().default("/api"),
  
  // 分析工具开关
  NEXT_PUBLIC_ENABLE_ANALYTICS: z.enum(["true", "false"]).default("false"),
  
  // 默认地理位置（备用）
  NEXT_PUBLIC_DEFAULT_LAT: z.string().default("39.9042"),
  NEXT_PUBLIC_DEFAULT_LNG: z.string().default("116.4074"),
});

// ============================================
// 服务端环境变量验证
// ============================================
const serverEnvSchema = z.object({
  // 景点图片 API (Unsplash)
  UNSPLASH_ACCESS_KEY: z.string().optional(),
  
  // 高德地图 API (国内景点)
  AMAP_API_KEY: z.string().optional(),
  
  // 分析工具 ID
  ANALYTICS_ID: z.string().optional(),
});

// ============================================
// 合并验证
// ============================================
const envSchema = clientEnvSchema.merge(serverEnvSchema);

// 类型定义
type ClientEnv = z.infer<typeof clientEnvSchema>;
type ServerEnv = z.infer<typeof serverEnvSchema>;
type Env = ClientEnv & ServerEnv;

// ============================================
// 验证函数
// ============================================
function validateEnv(): Env {
  const envToValidate = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_DEFAULT_LAT: process.env.NEXT_PUBLIC_DEFAULT_LAT,
    NEXT_PUBLIC_DEFAULT_LNG: process.env.NEXT_PUBLIC_DEFAULT_LNG,
    UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
    AMAP_API_KEY: process.env.AMAP_API_KEY,
    ANALYTICS_ID: process.env.ANALYTICS_ID,
  };

  const result = envSchema.safeParse(envToValidate);

  if (!result.success) {
    const errors = result.error.issues
      .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    
    throw new Error(
      `❌ 环境变量验证失败:\n${errors}\n\n` +
      `请检查 .env.local 文件`
    );
  }

  return result.data;
}

// 执行验证
export const env = validateEnv();

// ============================================
// 便捷导出
// ============================================

export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

export function getClientEnv(): ClientEnv {
  return {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_API_BASE: env.NEXT_PUBLIC_API_BASE,
    NEXT_PUBLIC_ENABLE_ANALYTICS: env.NEXT_PUBLIC_ENABLE_ANALYTICS,
    NEXT_PUBLIC_DEFAULT_LAT: env.NEXT_PUBLIC_DEFAULT_LAT,
    NEXT_PUBLIC_DEFAULT_LNG: env.NEXT_PUBLIC_DEFAULT_LNG,
  };
}

export function isUnsplashAvailable(): boolean {
  return !!env.UNSPLASH_ACCESS_KEY;
}

export function isAmapAvailable(): boolean {
  return !!env.AMAP_API_KEY;
}

export function getDefaultLocation(): { lat: number; lng: number } {
  return {
    lat: Number(env.NEXT_PUBLIC_DEFAULT_LAT),
    lng: Number(env.NEXT_PUBLIC_DEFAULT_LNG),
  };
}
