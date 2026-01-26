import fs from "fs";
import readline from "readline";
import path from "path";

const input = "./allCountries.txt"; // ton fichier GeoNames
const outputDir = "./data";
const outputFile = path.join(outputDir, "geonames_airports.json");

// ✅ Crée le dossier data s'il n'existe pas
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const rl = readline.createInterface({
  input: fs.createReadStream(input),
  crlfDelay: Infinity
});

const airports = [];

rl.on("line", (line) => {
  const p = line.split("\t");

  const feature_code = p[7];
  if (!["AIRP", "AIRH", "AIRF"].includes(feature_code)) return;

  airports.push({
    geonameId: Number(p[0]),
    name: p[1],
    asciiName: p[2],
    country: p[8],
    latitude: Number(p[4]),
    longitude: Number(p[5]),
    iata: p[16] || null,
    featureCode: feature_code
  });
});

rl.on("close", () => {
  fs.writeFileSync(outputFile, JSON.stringify(airports, null, 2));
  console.log(`✅ ${airports.length} aéroports convertis en JSON`);
  console.log(`📄 Fichier créé : ${outputFile}`);
});
