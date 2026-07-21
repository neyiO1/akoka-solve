import { z } from 'zod';

/**
 * Zod schema for environment variables validation.
 */
export const envValidationSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('4000'),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1h'),
  REDIS_URL: z.string().url().optional(),
  DATABASE_URL: z.string().url().optional(),
  CORS_ORIGINS: z.string().default('*'),
});

/**
 * Validates the environment variables using Zod schema.
 * @param config - The process.env object
 * @returns The validated environment object
 */
export function validateEnv(config: Record<string, unknown>) {
  const result = envValidationSchema.safeParse(config);

  if (!result.success) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  return result.data;
}
