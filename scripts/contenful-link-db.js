const fs = require("fs");
const axios = require("axios");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const sleepTime = 5000;

async function linkDatabaseEntries() {
  try {
    const dbArtists = await axios.get("http://localhost:5000/profiles");
    await fs.writeFileSync(
      "contentful-data/db-artists.json",
      JSON.stringify(dbArtists.data)
    );
    console.log("FETCHING SUCCESS!");

    await sleep(sleepTime);
  } catch (error) {
    console.log("FETCHING ERROR:");
    console.error(error);
    process.exit(1);
  }

  const startIndex = 0;
  const stopIndex = 10;

  const songFiles = fs.readdirSync("contentful-data/songs");

  for (let index = startIndex; index < stopIndex; index++) {
    let file = songFiles[index];
    let dbArtists = await fs.readFileSync(
      "contentful-data/db-artists.json",
      "utf-8"
    );

    dbArtists = JSON.parse(dbArtists);

    try {
      const filepath = "contentful-data/songs/" + file;
      var data = await fs.readFileSync(filepath, "utf8");

      data = JSON.parse(data);

      const artistsOfTheRawSong = data.artists;

      const mapRawArtistsToDbArtists = artistsOfTheRawSong.map((rawArtist) =>
        dbArtists.find((artist) => artist.slug === rawArtist.fields.slug)
      );

      console.log("BEGIN GET");
      const songOnDb = await axios.get(
        `http://localhost:5000/music-videos?slug=${data.slug}`
      );

      console.log("GET SUCCESS! NOW SLEEP");
      await sleep(sleepTime);

      console.log("BEGIN PUT");
      await axios.put(
        `http://localhost:5000/music-videos/${songOnDb.data[0].id}`,
        {
          originallyPerformedBy: mapRawArtistsToDbArtists,
        }
      );

      console.log("Successfully uploaded", file);
      console.log("Going to sleep for", sleepTime, "ms");
      await sleep(sleepTime);
    } catch (error) {
      console.error(error);
    }
  }
}

// uploadSongToStrapiAPI();
linkDatabaseEntries();
