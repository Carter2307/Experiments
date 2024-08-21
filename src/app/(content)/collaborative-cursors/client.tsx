"use client";

import { Stack } from "@/components/layouts/Stack/Stack";
import Tooltip from "@/components/Tooltip/Tooltip";
import { IconCirclesRelation } from "@tabler/icons-react";
import React from "react";
import Canvas from "./components/Canvas";
import Visualizer from "@/components/Visualizer/Visualizer";

export default function CollaborativeCursorClient(props: {
  metadata: { [key: string]: string };
}) {
  const { metadata } = props;

  return (
    <section className="w-full max-w-[41rem] h-screen mx-auto">
      <Stack direction="col" className="pt-40" gapy={48}>
        {/*Head*/}
        <Stack direction="row" align="center" justify="space-between">
          <Stack direction="col" gapy={8}>
            <h4 className="text-sm font-medium">{metadata.title}</h4>
            <p className="text-xs text-gray-500">{metadata.date}</p>
          </Stack>

          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button className="flex items-center justify-center h-9 w-9 aspect-square bg-gray-100 rounded-full">
                  <IconCirclesRelation size={16} />
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content
                  className="TooltipContent text-xs text-gray-600 bg-white py-2 px-4 rounded-xl shadow-sm"
                  sideOffset={5}
                >
                  Copy link
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Stack>

        {/* Canvas*/}
        <Visualizer alt={"*Ghost curors are removed after 30s on inactivity. Reload browser to reconnect."}>
          <Canvas/>
        </Visualizer>
      </Stack>
    </section>
  );
}
