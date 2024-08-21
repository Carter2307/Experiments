import React from "react";

type StackAlignValue =
  | "top-left"
  | "center-left"
  | "bottom-left"
  | "top-center"
  | "center"
  | "bottom-center"
  | "right-top"
  | "right-center"
  | "right-bottom";

interface StackProps {
  direction: "col" | "row" | "auto";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "end" | "space-between" | "space-arround" | "space-evenly";
  gapx?: number;
  gapy?: number;
  px?: number;
  py?: number;
  children?: React.ReactNode | React.ReactNode[];
  ref?: any
}

const AlignTailWindStyle = {
  col: {
    "top-left": { alignItems: "start", justifyContent: "start" },
    "center-left": { alignItems: "start", justifyContent: "center" },
    "bottom-left": { alignItems: "start", justifyContent: "end" },
    "top-center": { alignItems: "center", justifyContent: "start" },
    center: { alignItems: "center", justifyContent: "center" },
    "bottom-center": { alignItems: "center", justifyContent: "end" },
    "right-top": { alignItems: "start", justifyContent: "start" },
    "right-center": { alignItems: "end", justifyContent: "center" },
    "right-bottom": { alignItems: "end", justifyContent: "end" },
  },
  row: {
    "top-left": { alignItems: "start", justifyContent: "start" },
    "center-left": { alignItems: "center", justifyContent: "start" },
    "bottom-left": { alignItems: "end", justifyContent: "start" },
    "top-center": { alignItems: "start", justifyContent: "center" },
    center: { alignItems: "center", justifyContent: "center" },
    "bottom-center": { alignItems: "end", justifyContent: "center" },
    "right-top": { alignItems: "start", justifyContent: "end" },
    "right-center": { alignItems: "center", justifyContent: "end" },
    "right-bottom": { alignItems: "end", justifyContent: "end" },
  },

  auto: {
    wrap: { flexWrap: "wrap" },
  },
};

export const Stack: React.FC<StackProps & React.HTMLAttributes<HTMLDivElement>> = React.forwardRef((props, forwadedRef) => {
  switch (props.direction) {
    case "col":
      return <VerticalStack props={{...props, ref: forwadedRef}} />;
    case "row":
      return <HorizontalStack props={{...props, ref: forwadedRef}} />;
    default:
      return <VerticalStack props={{...props, ref: forwadedRef}}/>;
  }
});

const VerticalStack: React.FC<{
  props: StackProps & React.HTMLAttributes<HTMLDivElement>;
}> = ({ props }) => {
  let style: React.CSSProperties = {};
  const { className, align, justify, direction, gapy, gapx, ...rest } = props;

  if (align) {
    style.alignItems = align;
  }

  if (justify) {
    style.justifyContent = justify;
  }

  style.rowGap = gapy || 0;
  style.columnGap = gapx || 0;

  return (
    <div className={`flex flex-col ${className ?? className}`} style={{ ...style }} {...rest}>
      {props.children}
    </div>
  );
};

const HorizontalStack: React.FC<{
  props: StackProps & React.HTMLAttributes<HTMLDivElement>;
}> = ({ props }) => {
  let style: React.CSSProperties = {};
  const { className, direction, align, justify, gapy, gapx, ...rest } = props;

  if (align) {
    style.alignItems = align;
  }

  if (justify) {
    style.justifyContent = justify;
  }

  style.rowGap = gapy || 0;
  style.columnGap = gapx || 0;

  return (
    <div className={`flex flex-row ${className ?? className}`} style={{ ...style }} {...rest}>
      {props.children}
    </div>
  );
};
