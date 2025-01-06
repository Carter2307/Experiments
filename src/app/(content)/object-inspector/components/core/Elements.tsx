"use client";

import { ReactNode, useEffect, useState } from "react";

export enum ElementType {
  Shape,
  Image,
  Text,
}

interface ElementProps extends React.ComponentProps<"div"> {
  type: ElementType;
}

const Element = (props: ElementProps) => {
  const { children, type } = props;

  switch (type) {
    case ElementType.Shape:
      return <ShapeHandle >{children}</ShapeHandle>;
    case ElementType.Image:
      return <div className="">{children}</div>;
  }
};

const ShapeHandle = (props: { children: ReactNode }) => {
  const { children } = props;
  return <g>{children}</g>;
};
const Handle = () => {};

export default Element;
