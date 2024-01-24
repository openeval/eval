import type { Meta, StoryObj } from "@storybook/react";

// import { AssessmentSettingsPage } from "./AssessmentSettingsPage";

const AssessmentSettingsPage = () => {
  return <div>Hello</div>;
};
const meta = {
  title: "app/AssessmentSettingsPage",
  component: AssessmentSettingsPage,
} satisfies Meta<typeof AssessmentSettingsPage>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {
  args: { params: { page: 1 } },
};
