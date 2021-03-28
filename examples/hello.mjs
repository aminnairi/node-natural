import {createNaturalOptionParser} from "../sources/natural.mjs";

const parse = createNaturalOptionParser([
  {name: "help", option: "help", isBoolean: true, isMultiple: false},
  {name: "name", option: "name", isBoolean: false, isMultiple: false},
  {name: "countries", option: "country", isBoolean: false, isMultiple: true}
]);

const [parsed, unknown, lone] = parse(process.argv.slice(2));

if (lone.length > 0) {
  console.error(`Lone argument: ${lone[0]}`);
  process.exit(1);
}

if (unknown.length > 0) {
  console.error(`Unknown argument: ${unknown[0]}`);
  process.exit(2);
}

if (parsed.name === undefined) {
  console.error(`Missing argument: name`);
  process.exit(3);
}

if (parsed.help) {
  console.log("Usage:");
  console.log("  hello name You");
  console.log("  hello name You country France");
  console.log("  hello name You country France country spain");
  process.exit(0);
}

if ((parsed.countries ?? []).length > 0) {
  console.log(`Hello ${parsed.name} from ${parsed.countries.join(", ")}!`);
  process.exit(0);
}

console.log(`Hello ${parsed.name}!`);
