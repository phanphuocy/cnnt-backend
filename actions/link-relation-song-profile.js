//   try {
//     let mvModel = strapi.services["music-videos"];
//     let profileModel = strapi.services["profiles"];
//     const pathToMVFolder = "contentful-data/songs";
//     let folder = await fs.readdirSync(pathToMVFolder);
//     console.info("SONG FOLDER READ");
//     console.info("FOUND", folder.length, "SONGS IN FOLDER.");
//     let databaseProfile = await profileModel.find();
//     let profileIdBySlugDictionary = {};
//     databaseProfile.forEach((profile) => {
//       profileIdBySlugDictionary[profile.slug] = profile.id;
//     });
//     for (let index = 0; index < folder.length; index++) {
//       let pathToFile = pathToMVFolder + "/" + folder[index];
//       let fileData = await fs.readFileSync(pathToFile, { encoding: "utf-8" });
//       let song = JSON.parse(fileData);
//       if (song.artists.length <= 0 || !song.slug) {
//         console.log("FILE ERROR");
//         return;
//       }
//       let songSlug = song.slug;
//       let artistSlugs = [];
//       song.artists.forEach((person) => artistSlugs.push(person.fields.slug));
//       mvModel.update(
//         { slug: songSlug },
//         {
//           originallyPerformedBy: artistSlugs.map(
//             (slug) => profileIdBySlugDictionary[slug]
//           ),
//         }
//       );
//       console.log("UPDATED:", song.slug, "ARTISTS");
//     }
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
