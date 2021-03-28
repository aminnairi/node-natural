# node-natural

Parse options using a natural language

[![Tests](https://github.com/aminnairi/node-natural/actions/workflows/test.yaml/badge.svg?branch=next)](https://github.com/aminnairi/node-natural/actions/workflows/test.yaml) [![Publish](https://github.com/aminnairi/node-natural/actions/workflows/publish.yaml/badge.svg?branch=latest)](https://github.com/aminnairi/node-natural/actions/workflows/publish.yaml)

## Requirements

- Node

## Usage

```console
$ npm install @aminnairi/natural
$ touch hello
```

```javascript
#!/usr/bin/env node

import {createNaturalOptionParser} from "@aminnairi/natural";

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
  console.log("  hello name You country France country Spain");
  process.exit(0);
}

if ((parsed.countries ?? []).length > 0) {
  console.log(`Hello ${parsed.name} from ${parsed.countries.join(", ")}!`);
  process.exit(0);
}

console.log(`Hello ${parsed.name}!`);
```

```console
$ chmod +x hello

$ ./hello
Missing argument: name

$ ./hello name
Lone argument: name

$ ./hello name You hello
Unknown argument: hello

$ ./hello name You
Hello You!

$ ./hello name You country France
Hello You from France!

$ ./hello name You country France country Spain
Hello You from France, Spain!

$ ./hello name You country France country Spain help
Usage:
  hello name You
  hello name You country France
  hello name You country France country Spain
```
