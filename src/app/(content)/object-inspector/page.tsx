"use client";

import React from "react";
import Inspector from "./components/Inspector";
import Shape from "./components/Shapes/Shape";
import { ShapeKind, ShapeProps } from "./types";
import Canva from "./components/Canva/Canva";
import Point from "./components/core/Point";
import AppProvider from "./context";

type AppProps = {
  pixels: number;
};

export default function Page() {
  // Tableau de shape
  const [shapes, setShapes] = React.useState<ShapeProps[]>([
    {
      id: 0,
      type: ShapeKind.Square,
      size: { w: 60, h: 60 },
      position: new Point(10, 30),
      fill: "#e5e5e5",
    },
    {
      id: 1,
      type: ShapeKind.Square,
      size: { w: 80, h: 300 },
      position: new Point(40, 100),
      fill: "#e5e5e5",
    },
  ]);

  // La shape courante
  const [currentShape, setCurrentShape] = React.useState(shapes[0]);

  // Ajouter une forme
  const addShape = () => {
    const newShape = {
      id: shapes.length == 0 ? 0 : shapes[shapes.length - 1].id + 1,
      type: ShapeKind.Square,
      layout: { w: 100, h: 100 },
    };

    //setShapes((prev) => [...prev, newShape]);
  };

  //Mettre à jours les props
  const updateShape = (id: number, newProps: Partial<ShapeProps>) => {
    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === id ? { ...shape, ...newProps } : shape
      )
    );
  };

  return (
    <AppProvider>
      <div className="workbench flex absolute left-0 top-0 right-0 bottom-0">
        <div className="flex items-center justify-center flex-grow">
          <Canva>
            {shapes &&
              shapes.map((shape) => (
                <Shape
                  key={shape.id}
                  {...shape}
                  whenSelected={(id: number) => setCurrentShape(shapes[id])}
                />
              ))}
          </Canva>
        </div>

        <Inspector
          currentShape={currentShape}
          onUpdate={(newProps) => updateShape(currentShape.id, newProps)}
        />
        {/* todo => Toolsbar */}
      </div>
    </AppProvider>
  );
}
