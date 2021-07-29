"use strict";
const fs = require("fs");
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */

module.exports = {
  /**
   * Simple example.
   * Every monday at 1am.
   */
  // '0 1 * * 1': () => {
  //
  // }
  "0 * * * *": async () => {
    const mv = await strapi.services["music-videos"].find();
    await fs.writeFileSync("backup-data/mv.json", JSON.stringify(mv, null, 2), {
      encoding: "utf-8",
    });

    const profiles = await strapi.services["profiles"].find();
    await fs.writeFileSync(
      "backup-data/profiles.json",
      JSON.stringify(profiles, null, 2),
      { encoding: "utf-8" }
    );
  },
};
