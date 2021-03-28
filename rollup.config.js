import {resolve} from "path";
import {terser} from "rollup-plugin-terser";
import remove from "rollup-plugin-delete";

export default {
  input: resolve("sources", "natural.mjs"),
  plugins: [
    remove({
      verbose: true,
      targets: [
        resolve("release", "**", "*")
      ]
    }),
    terser()
  ],
  output: {
    file: resolve("release", "natural.js"),
    format: "cjs"
  }
}
