"use client";

import React from "react";
import { ShapeKind } from "../../types";
import Element, { ElementType } from "../core/Elements";
import { AppContext } from "../../context";

export enum ShapeType {
  Rectangle = 'rectangle',
  Ellipse = 'ellipse',
  Line = 'line',
  Polygon = 'polygon',
  Star = 'star',
  Image = 'image'
}

interface ShapeProps {
  id: string;
  type: ShapeType;
  position: { x: number; y: number };
  size: { w: number; h: number };
  fill: string;
  points?: { x: number; y: number }[]; // For polygon
  imageUrl?: string; // For image type
  starPoints?: number; // For star shape
  whenSelected?: (id: string) => void;
}

const generatePath = (properties: ShapeProps): string => {
  const { position, size } = properties;
  
  switch (properties.type) {
    case ShapeType.Rectangle:
      return `
        M ${position.x} ${position.y}
        L ${position.x + size.w} ${position.y}
        L ${position.x + size.w} ${position.y + size.h}
        L ${position.x} ${position.y + size.h}
        Z`;
    
    case ShapeType.Ellipse:
      const rx = size.w / 2;
      const ry = size.h / 2;
      const cx = position.x + rx;
      const cy = position.y + ry;
      return `M ${cx-rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx+rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx-rx} ${cy}`;
    
    case ShapeType.Line:
      return `M ${position.x} ${position.y} L ${position.x + size.w} ${position.y + size.h}`;
    
    case ShapeType.Polygon:
      if (!properties.points?.length) return '';
      return `M ${properties.points[0].x} ${properties.points[0].y} 
              ${properties.points.map((p, i) => `L ${p.x} ${p.y}`).join(' ')} Z`;
    
    case ShapeType.Star:
      const points = properties.starPoints || 5;
      const outerRadius = Math.min(size.w, size.h) / 2;
      const innerRadius = outerRadius / 2;
      const cxStar = position.x + size.w / 2;
      const cyStar = position.y + size.h / 2;
      let path = `M ${cxStar + outerRadius} ${cyStar}`;
      
      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? innerRadius : outerRadius;
        const angle = (Math.PI / points) * i;
        path += ` L ${cxStar + radius * Math.cos(angle)} ${cyStar + radius * Math.sin(angle)}`;
      }
      return path + ' Z';
    
    default:
      return '';
  }
};

const Shape: React.FC<ShapeProps> = (props) => {
  const [properties, setProperties] = React.useState<ShapeProps>(props);

  React.useEffect(() => {
    setProperties(props);
  }, [props]);

  if (props.type === ShapeType.Image && props.imageUrl) {
    return (
      <Element type={ElementType.Shape}>
        <foreignObject
          x={properties.position.x}
          y={properties.position.y}
          width={properties.size.w}
          height={properties.size.h}
        >
          <img
            src={props.imageUrl}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            alt="shape"
          />
        </foreignObject>
      </Element>
    );
  }

  return (
    <Element type={ElementType.Shape}>
      <path
        d={generatePath(properties)}
        fill={properties.type === ShapeType.Line ? 'none' : properties.fill}
        stroke={properties.type === ShapeType.Line ? properties.fill : 'none'}
        strokeWidth={properties.type === ShapeType.Line ? 2 : 0}
        onClick={() => props.whenSelected?.(properties.id)}
      />
    </Element>
  );
};

export default Shape;
