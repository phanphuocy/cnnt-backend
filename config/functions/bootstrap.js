"use strict";
const seedData = require("../../actions/seed-data");
const linkMusicVideosToProfiles = require("../../actions/link-relation-song-profile");
/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#bootstrap
 */

module.exports = async () => {
  // await seedData(strapi, { deleteAllEntriesBeforeCreating: true });
  // await linkMusicVideosToProfiles(strapi);
};
