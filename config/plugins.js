module.exports = ({ env }) => ({
  // ...
  upload: {
    provider: "cloudinary",
    providerOptions: {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
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
