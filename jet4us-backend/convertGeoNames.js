import fs from "fs";
import readline from "readline";

const input = "./cities15000.txt";
const output = "./data/cities15000.json";

const rl = readline.createInterface({
  input: fs.createReadStream(input),
  crlfDelay: Infinity
});

const cities = [];

rl.on("line", (line) => {
  const p = line.split("\t");

  cities.push({
    name: p[1],
    country: p[8],
    type: "city",
    iata: null,
    latitude: Number(p[4]),
    longitude: Number(p[5]),
    population: Number(p[14])
  });
});

rl.on("close", () => {
  fs.writeFileSync(output, JSON.stringify(cities, null, 2));
  console.log(`✅ ${cities.length} villes converties en JSON`);
});
