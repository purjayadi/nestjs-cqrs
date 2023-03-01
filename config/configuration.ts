export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 55500,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  DATABASE_URL: process.env.DATABASE_URL,
});
