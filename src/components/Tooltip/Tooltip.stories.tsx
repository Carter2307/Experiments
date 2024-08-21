import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Tooltip from './Tooltip';
import { IconPlus } from '@tabler/icons-react';

const meta = {
  title: 'Tooltip',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default = () => {
    <Tooltip.Provider>
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button className="IconButton">
          <IconPlus />
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="TooltipContent text-xs text-gray-500 bg-white py-2 px-4 rounded-md shadow-sm" sideOffset={5}>
          Add to library
          <Tooltip.Arrow className="TooltipArrow" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  </Tooltip.Provider>
}