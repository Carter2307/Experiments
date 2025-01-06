"use client";

import React from "react";
import { ShapeProps, ShapeKind } from "../../types";
import Element, { ElementType } from "../core/Elements";
import { AppContext } from "../../page";

const Shape = (props: ShapeProps) => {
  const defaultProperties: ShapeProps = {
    id: 0,
    type: ShapeKind.Square,
    layout: { w: 48, h: 48 },
    position: { x: 48, y: 48 },
    fill: "#e5e5e5",
    radius: {
      tl: 8,
      bl: 8,
      tr: 8,
      br: 8,
    },
    stroke: {
      size: 1,
      color: "gray",
    },
    shadow: undefined,
  };

  const { pixels } = React.useContext(AppContext);
  const { whenSelected, ...rest } = props;

  const [properties, setProperties] = React.useState<ShapeProps>(
    Object.assign(defaultProperties, rest)
  );

  React.useEffect(() => {
    setProperties(props);
  }, [props]);

  return (
    <Element type={ElementType.Shape}>
      <path
        d={`
          M ${properties.position.x} ${properties.position.y}
          L ${properties.size.w} ${properties.position.y}
          L ${properties.size.w} ${properties.size.h}
          L ${properties.position.x} ${properties.size.h} 
          Z
          `}
        
        fill={properties.fill}
        onClick={() => whenSelected?.(properties.id)}
      />
    </Element>
  );
};

export default Shape;
