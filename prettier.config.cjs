/** @type {import("prettier").Config & import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    require.resolve("prettier-plugin-tailwindcss"),
  ],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^~/", "^[.][.]/", "^[.]/"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
