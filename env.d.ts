namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "test" | "production";
    TURSO_CONNECTION_URL: string;
    TURSO_AUTH_TOKEN: string;
    CLERK_SECRET_KEY: string;
    ANALYZE: "true" | "false" | undefined;
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
    VERCEL_URL: string | undefined;
  }
}
