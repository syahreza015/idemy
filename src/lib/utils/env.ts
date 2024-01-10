import { isValid, z } from 'zod';

const envSchema = z.object({
  BASE_URL: z.string(),
  ACCESS_TOKEN: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
});

export type envType = z.infer<typeof envSchema>;

const isEnvValid = envSchema.safeParse(process.env);

if (!isEnvValid.success) {
  throw new Error('Invalid Environment Variable');
}

const validEnv = isEnvValid.data;

export default validEnv;
