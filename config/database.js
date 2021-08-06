// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'sqlite',
//         filename: env('DATABASE_FILENAME', '.tmp/data.db'),
//       },
//       options: {
//         useNullAsDefault: true,
//       },
//     },
//   },
// });

module.exports = ({ env }) => ({
  defaultConnection: "default",
  // connections: {
  //   default: {
  //     connector: "bookshelf",
  //     settings: {
  //       client: "postgres",
  //       host: env("DATABASE_HOST", "localhost"),
  //       port: env.int("DATABASE_PORT", 5432),
  //       database: env("DATABASE_NAME", "cnnt-local-strapi"),
  //       username: env("DATABASE_USERNAME", "postgres"),
  //       password: env("DATABASE_PASSWORD"),
  //       schema: env("DATABASE_SCHEMA", "public"),
  //     },
  //     options: {
  //       useNullAsDefault: true,
  //     },
  //   },
  // },
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        uri: env("MONGODB_DATABASE_URI"),
        srv: env.bool("DATABASE_SRV", true),
        port: env.int("DATABASE_PORT", 27017),
        database: env("MONGODB_DATABASE_NAME"),
      },
      options: {
        authenticationDatabase: env("AUTHENTICATION_DATABASE", null),
        ssl: env.bool("DATABASE_SSL", true),
      },
    },
  },
});
