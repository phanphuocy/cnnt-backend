module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: env("CLOUDINARY_NAME"),
      api_key: env("CLOUDINARY_KEY"),
      api_secret: env("CLOUDINARY_SECRET"),
      // make sure the asset is uploaded to "cnnt-strapi" folder
      upload_preset: "aeu5eit8",
    },
    actionOptions: {
      upload: {},
      delete: {},
    },
  },
  // ...
});
