const contentful = require("contentful");
const fs = require("fs");

const client = contentful.createClient({
  accessToken: "rBv9auHIz1Qx3HlXGh0FGn4TFcc0O8uylkDlFtWiw6c",
  space: "exl0x88tcld8",
});

async function downloadSongsToJSON() {
  const songResponse = await client.getEntries({
    content_type: "songs",
    limit: 500,
  });
  const { items } = songResponse;

  items.forEach((item) => {
    let filename = `contentful-data/songs/${item.fields.slug}.json`;
    let data = JSON.stringify(item.fields);
    fs.writeFileSync(filename, data);
  });

  console.log(items.length, "songs downloaded.");
}

async function downloadArtistsToJSON() {
  const songResponse = await client.getEntries({
    content_type: "artists",
    limit: 200,
  });
  const { items } = songResponse;

  items.forEach((item) => {
    let filename = `contentful-data/artists/${item.fields.slug}.json`;
    let data = JSON.stringify(item.fields);
    fs.writeFileSync(filename, data);
  });

  console.log(items.length, "artists downloaded.");
}

downloadSongsToJSON();
// downloadArtistsToJSON();
