import type { Meta, StoryObj } from "@storybook/react";
import { ScrollView as View } from "./View";

const meta = {
  title: "View",
  component: View,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};