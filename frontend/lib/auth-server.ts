import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { Pool } from "pg";

console.log("Database URL present:", !!process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

export const auth = betterAuth({
    database: pool,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        jwt({
            jwt: {
                secret: process.env.BETTER_AUTH_SECRET,
            },
        }),
    ],
});
