import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta = {
  title: "Stack",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Row = () => {
  return (
    <Stack
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      className={"w-96 border-solid border-[1px] p-4 rounded-2xl"}>
      <p>Historique de contact</p>
      <button>X</button>
    </Stack>
  );
};

export const Column = () => {
  return (
    <Stack
      direction={"col"}
      align={"center"}
      justify={"space-between"}
      gapy={16}
      className={"w-96 border-solid border-[1px] p-4 rounded-2xl"}>
      <p>Texx</p>
      <button>Button</button>
    </Stack>
  );
};
