const fs = require("fs");
const axios = require("axios");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function uploadSongToStrapiAPI() {
  const files = fs.readdirSync("contentful-data/songs");

  const startIndex = 0;
  const stopIndex = 200;
  const sleepTime = 1000;

  for (let index = startIndex; index < stopIndex; index++) {
    let file = files[index];

    try {
      const filepath = "contentful-data/songs/" + file;
      var data = await fs.readFileSync(filepath, "utf8");
      data = JSON.parse(data);

      await axios.post("http://localhost:5000/music-videos", {
        thaiTitle: data.titleTh,
        englishTitle: data.titleEn,
        lyrics: data.lyricsTh,
        youtubeVideoId: data.url,
        slug: data.slug,
      });

      console.log("Successfully uploaded", file);
      console.log("Going to sleep for", sleepTime, "ms");
      await sleep(sleepTime);
    } catch (error) {
      console.error(error);
    }
  }
}

async function uploadArtistsToStrapiAPI() {
  const files = fs.readdirSync("contentful-data/artists");

  const startIndex = 0;
  const stopIndex = 200;
  const sleepTime = 1000;

  for (let index = startIndex; index < stopIndex; index++) {
    let file = files[index];

    try {
      const filepath = "contentful-data/artists/" + file;
      var data = await fs.readFileSync(filepath, "utf8");
      data = JSON.parse(data);

      await axios.post("http://localhost:5000/profiles", {
        artName: data.name,
        slug: data.slug,
      });

      console.log("Successfully uploaded", file);
      console.log("Going to sleep for", sleepTime, "ms");
      await sleep(sleepTime);
    } catch (error) {
      console.error(error);
    }
  }
}

// uploadSongToStrapiAPI();
uploadArtistsToStrapiAPI();
