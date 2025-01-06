export enum ShapeKind {
  Square = "Square",
  Circle = "Circle",
}

export type Point = {
  x: number;
  y: number;
};

export type ObjectProps = {
  position: Point;
  size: { w: number; h: number };

  fill?: string;

  stroke?: {
    color: string;
    size: number;
  };

  radius?: {
    tl: number;
    bl: number;
    tr: number;
    br: number;
  };

  shadow?: {
    position: Point;
    blur: number;
    color: string;
  };
};

export interface ShapeProps extends ObjectProps {
  id: number;
  type: ShapeKind;
  whenSelected?: (id: number) => void;
}
