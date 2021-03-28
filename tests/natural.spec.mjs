import {describe, it} from "mocha";
import {expect} from "chai";
import {createNaturalOptionParser} from "../sources/natural.mjs";

describe("createNaturalOptionParser", () => {
  it("should parse a boolean non-multiple argument", () => {
    const parse = createNaturalOptionParser([
      {
        name: "help",
        option: "help",
        isBoolean: true,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["help"]);

    expect(parsed).to.deep.equal({help: true});
  });

  it("should parse a non-boolean non-multiple argument", () => {
    const parse = createNaturalOptionParser([
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["input", "input.js"]);

    expect(parsed).to.deep.equal({input: "input.js"});
  });

  it("should parse a non-boolean multiple argument", () => {
    const parse = createNaturalOptionParser([
      {
        name: "countries",
        option: "country",
        isBoolean: false,
        isMultiple: true
      },
      {
        name: "protocols",
        option: "protocol",
        isBoolean: false,
        isMultiple: true
      }
    ]);

    const [parsed, unknown, lone] = parse(["country", "France", "country", "Spain", "protocol", "https"]);

    expect(parsed).to.deep.equal({countries: ["France", "Spain"], protocols: ["https"]});
  });

  it("should not parse lone arguments", () => {
    const parse = createNaturalOptionParser([
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["input"]);

    expect(lone).to.deep.equal(["input"]);
  });

  it("should not parse lone trailing arguments", () => {
    const parse = createNaturalOptionParser([
      {
        name: "output",
        option: "output",
        isBoolean: false,
        isMultiple: false,
      },
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["output", "index.min.js", "input"]);

    expect(lone).to.deep.equal(["input"]);
  });

  it("should not parse unknown arguments", () => {
    const parse = createNaturalOptionParser([
      {
        name: "output",
        option: "output",
        isBoolean: false,
        isMultiple: false,
      },
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["javascript"]);

    expect(unknown).to.deep.equal(["javascript"]);
  });

  it("should not parse many unknown arguments", () => {
    const parse = createNaturalOptionParser([
      {
        name: "output",
        option: "output",
        isBoolean: false,
        isMultiple: false,
      },
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      }
    ]);

    const [parsed, unknown, lone] = parse(["javascript", "php"]);

    expect(unknown).to.deep.equal(["javascript", "php"]);
  });

  it("should parse everything correctly", () => {
    const parse = createNaturalOptionParser([
      {
        name: "minify",
        option: "minify",
        isBoolean: true,
        isMultiple: false
      },
      {
        name: "input",
        option: "input",
        isBoolean: false,
        isMultiple: false
      },
      {
        name: "output",
        option: "output",
        isBoolean: false,
        isMultiple: false,
      },
      {
        name: "formats",
        option: "format",
        isBoolean: false,
        isMultiple: true
      }
    ]);

    const [parsed, unknown, lone] = parse(["minify", "output", "index.js", "format", "cjs", "format", "esm", "javascript", "input"]);

    expect(parsed).to.deep.equal({minify: true, output: "index.js", formats: ["cjs", "esm"]});
    expect(unknown).to.deep.equal(["javascript"]);
    expect(lone).to.deep.equal(["input"]);
  });
});
