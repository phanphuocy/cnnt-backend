const fs = require("fs");

async function seedData(strapi, { deleteAllEntriesBeforeCreating }) {
  try {
    let profileService = strapi.services["profiles"];
    let musicVideoService = strapi.services["music-videos"];

    if (deleteAllEntriesBeforeCreating) {
      await profileService.delete();
      await musicVideoService.delete();
    }

    let folderOfSongs = "contentful-data/songs";
    let folderOfArtists = "contentful-data/artists";

    let songFiles = await fs.readdirSync(folderOfSongs, "utf-8");
    songFiles = JSON.parse(JSON.stringify(songFiles));

    let artistsFiles = await fs.readdirSync(folderOfArtists, "utf-8");
    artistsFiles = JSON.parse(JSON.stringify(artistsFiles));

    /* WORKING ON RAW FILES
     */

    for (let i = 0; i < artistsFiles.length; i++) {
      let file = await fs.readFileSync(
        folderOfArtists + "/" + artistsFiles[i],
        "utf-8"
      );
      file = JSON.parse(file);

      await profileService.create({
        artName: file.name,
        slug: file.slug,
        ...(file.spotify && { spotify: file.spotify }),
        ...(file.instagram && { instagram: file.instagram }),
        ...(file.facebook && { facebook: file.facebook }),
        ...(file.youtube && { youtube: file.youtube }),
      });
    }
    console.info(
      "SUCCESS :: Created",
      artistsFiles.length,
      "profiles to database!"
    );

    for (let i = 0; i < songFiles.length; i++) {
      let file = await fs.readFileSync(
        folderOfSongs + "/" + songFiles[i],
        "utf-8"
      );
      file = JSON.parse(file);

      if (!file.titleTh) {
        console.error("Thai title not found", songFiles[i]);
        continue;
      } else if (!file.titleEn) {
        console.error("English title not found", songFiles[i]);
        continue;
      } else if (!file.titleRo) {
        console.error("Romanized title not found", songFiles[i]);
        continue;
      } else if (!file.lyricsTh) {
        console.error("Lyrics not found", songFiles[i]);
        continue;
      } else if (!file.url) {
        console.error("Youtube id not found", songFiles[i]);
        continue;
      }

      await musicVideoService.create({
        thaiTitle: file.titleTh,
        englishTitle: file.titleEn,
        transliteration: file.titleRo,
        lyrics: file.lyricsTh,
        slug: file.slug,
        youtubeVideoId: file.url,
      });
    }
    console.info(
      "SUCCESS :: Created",
      songFiles.length,
      "music videos to database!"
    );
  } catch (error) {
    console.log("ERROR:");
    console.error(error);
  }
}

module.exports = seedData;
