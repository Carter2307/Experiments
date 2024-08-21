import { ReactNode } from "react";
import { Stack } from "../layouts/Stack/Stack";

export interface VisualizerProps extends React.ComponentProps<"div"> {
  height?: number;
  alt?: string;
}

export default function Visualizer(props: VisualizerProps) {
  const { children, alt, height = 384, ...rest } = props;

  return (
    <Stack direction="col" gapy={8}>
      <div
        className="overflow-hidden bg-gray-100 rounded-xl border-[1px] border-solid border-gray-200"
        style={{
          height: height + "px",
        }}
        {...rest}
      >
        {children}
      </div>

      {alt && (
        <Stack direction="row" align="center" justify="center" className="px-6">
          <p className="text-xs text-gray-500">{alt}</p>
        </Stack>
      )}
    </Stack>
  );
}

Visualizer.displayName="Visualizer"
