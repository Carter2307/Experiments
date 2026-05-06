import {Stack} from "@/components/layouts/Stack/Stack";
import Tooltip from "@/components/Tooltip/Tooltip";
import {IconCirclesRelation} from "@tabler/icons-react";
import Visualizer from "@/components/Visualizer/Visualizer";
import React from "react";
import {CraftCategory, CraftItem} from "@/constant/crafts";
import {BackButton} from "@/components/BackButton/BackButton";

interface CraftWithVisualizerProps {
    detail: CraftItem
    children: React.ReactNode
}

export default function CraftWithVisualizer(props: CraftWithVisualizerProps) {
    const {detail, children} = props;

    return <section className="w-full max-w-[41rem] h-screen mx-auto">
        <Stack direction="col" className="pt-40" gapy={48}>
            {/*Header*/}
            <BackButton className={"mr-auto"}/>
            <Stack direction="row" align="center" justify="space-between">
                <Stack direction="col" gapy={8}>
                    <h4 className="text-sm font-medium">{detail.title}</h4>
                    <p className="text-xs text-gray-500">{detail.date}</p>
                </Stack>

                <Tooltip.Provider>
                    <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                            <button
                                className="flex items-center justify-center h-9 w-9 aspect-square bg-gray-100 rounded-full">
                                <IconCirclesRelation size={16}/>
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

            {/*Visualize*/}
            <Visualizer
                alt={<span>
              Original post on{" "}
                    <a
                        href="https://x.com/nitishkmrk/status/1875795617437696228"
                        className="font-medium underline"
                    >
                X
              </a>
            </span>}>
                <div className="h-full w-full flex items-center justify-center scale-150">
                    {children}
                </div>
            </Visualizer>

        </Stack>
    </section>
}