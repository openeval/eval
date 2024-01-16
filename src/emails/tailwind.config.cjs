// eslint-disable-next-line
const tailwindCofig = require("../../tailwind.config.cjs");

const config = {
  ...tailwindCofig,
  theme: {
    ...tailwindCofig.theme,
    variables: {
      // `DEFAULT` stands for `:root` in CSS
      DEFAULT: {
        // The css variables are nested according to how they appear
        // with the hyphens (-) e.g --red-50 => red: { 50: "#hexCode"}
        primary: {
          DEFAULT: "188.82 89.79% 46.08%",
          foreground: "0 0% 100%",
        },
        background: "0 0% 100%",
        foreground: "0 0% 0%",
        font: {
          sans: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
        },
        radius: "0.5rem",
      },
    },
  },
  // Setup the plugins array and add @mertasan/tailwindcss-variables
  plugins: [
    ...tailwindCofig.plugins,
    require("@mertasan/tailwindcss-variables"),
  ],
};

module.exports = config;
