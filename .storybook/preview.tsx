import type { Preview } from "@storybook/react";
import React from "react";

import Layout from "../src/app/layout.tsx";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      // @ts-expect-error experimental RSC
      <Layout>
        <Story />
      </Layout>
    ),
  ],
};

export default preview;
