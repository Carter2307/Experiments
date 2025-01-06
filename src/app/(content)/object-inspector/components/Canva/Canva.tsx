"use client";

import React from "react";

interface CanvaI extends React.ComponentProps<"svg"> {
  fill?: string;
  zoom?: number;
}

const line = {
  STROKE_WIDTH: 0.0625,
};

const Canva = (props: CanvaI) => {
  const { children, zoom: inititalZoom = 1, ...rest } = props;
  const [zoom, setZoom] = React.useState(inititalZoom);
  const pixels =  0;

  const style = {
    height: `100%`,
    width: `100%`,
    transform: `scale(${zoom})`,
  };

  const patternLines = [
    {
      id: "h-line",
      x1: 1,
      y1: 0,
      x2: 1,
      y2: 1,
      strokeWidth: line.STROKE_WIDTH,
    },
    {
      id: "v-line",
      x1: 1,
      y1: 1,
      x2: 0,
      y2: 1,
      strokeWidth: line.STROKE_WIDTH,
    },
  ];

  return (
    <div className="h-full w-full bg-white">
      <svg className="" {...rest} viewBox={`0 0 ${pixels} ${pixels}`}>
        <g>
          <defs>
            <pattern
              id=":grid-line:"
              patternUnits="userSpaceOnUse"
              width={1}
              height={1}
            >
              {patternLines.map((line) => {
                return (
                  <line key={line.id} {...line} className="stroke-slate-100" />
                );
              })}
            </pattern>

            <pattern
              id=":grid-rect:"
              patternUnits="userSpaceOnUse"
              width={1}
              height={1}
            >
              <rect width={5} height={5} fill="url(#:grid-line:)" />
              <line
                x1={1}
                y1={0}
                x2={5}
                y2={5}
                className="stroke-slate-100"
                strokeWidth={0.125}
              />
              <line
                x1={0}
                y1={5}
                x2={5}
                y2={5}
                className="stroke-slate-200"
                strokeWidth={0.125}
              />
            </pattern>
          </defs>
          <rect
            y={0}
            x={0}
            height={"100%"}
            width={"100%"}
            strokeWidth={line.STROKE_WIDTH}
            fill="url(#:grid-rect:)"
          />
        </g>
        {children}
      </svg>
    </div>
  );
};

export default Canva;
