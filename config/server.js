module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 5000),
  cron: {
    enabled: true,
  },
  admin: {
    auth: {
      secret: env("ADMIN_JWT_SECRET", "36ebbcd64cbbce31cdefd2e8d02bc3bd"),
    },
  },
});
