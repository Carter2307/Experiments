"use client";

import React, {
  ChangeEvent,
  ChangeEventHandler,
  createContext,
  ReactElement,
  ReactNode,
} from "react";
import { ShapeProps, ObjectProps } from "../types";
import { HIcon, WIcon } from "./Icons";
import {
  IconBlur,
  IconLetterXSmall,
  IconLetterYSmall,
  IconLine,
  IconRadiusBottomLeft,
  IconRadiusBottomRight,
  IconRadiusTopLeft,
  IconRadiusTopRight,
  IconSquareFilled,
} from "@tabler/icons-react";
import InputColorPicker from "./Inputs/Colors";

type InspectorProps = {
  currentShape: ShapeProps | null;
  onUpdate: (props: Partial<ShapeProps>) => void;
};

type InspectorContextProps = InspectorProps;

const InspectorContext = createContext<InspectorContextProps>({
  currentShape: null,
  onUpdate: () => {},
});

export default function Inspector(props: InspectorProps) {
  const { currentShape, onUpdate } = props;

  const title = "Properties";

  return (
    <InspectorContext.Provider value={{ currentShape, onUpdate }}>
      <section className="absolute right-4 top-4 bottom-4 rounded-lg bg-white flex flex-col w-60 border border-solid border-gray-100 shadow">
        <div className="text-xs font-bold px-6 py-2">{title}</div>
        <div className="">
          <Size />
          <Fill />
          <Stroke />
          <Border />
          <Shadow />
          <Divider />
        </div>
      </section>
    </InspectorContext.Provider>
  );
}

const Stroke = () => {
  return (
    <PanelRow title="Stroke">
      <div className="grid grid-cols-2 gap-1">
        <InputContainer icon={<IconSquareFilled size={16} />} />
        <InputContainer icon={<IconLine size={16} />} />
      </div>
    </PanelRow>
  );
};

const Shadow = () => {
  return (
    <PanelRow title="Shadow">
      <div className="grid grid-cols-2 gap-1">
        <InputContainer icon={<IconLetterXSmall size={20} />} />
        <InputContainer icon={<IconLetterYSmall size={20} />} />
        <InputContainer icon={<IconBlur size={16} />} />
        <InputColorPicker />
      </div>
    </PanelRow>
  );
};

const Divider = () => {
  return (
    <div className="border-solid border-gray-100 border-l-[1px] w-full flex bg-none" />
  );
};

const Fill = () => {
  return (
    <PanelRow title="Fill">
      <InputContainer icon={<IconSquareFilled size={16} />} />
    </PanelRow>
  );
};

const Border = () => {
  const iconSize = 12;
  return (
    <PanelRow title="Corner radius">
      <div className="grid grid-cols-2 gap-1">
        <InputContainer icon={<IconRadiusTopLeft size={iconSize} />} />
        <InputContainer icon={<IconRadiusTopRight size={iconSize} />} />
        <InputContainer icon={<IconRadiusBottomLeft size={iconSize} />} />
        <InputContainer icon={<IconRadiusBottomLeft size={iconSize} />} />
      </div>
    </PanelRow>
  );
};

const Size = () => {
  const { currentShape, onUpdate } = React.useContext(InspectorContext);

  const setWidth = (value: number) => {
    console.log(value);
    if (!currentShape) return;
    onUpdate({
      size: { ...currentShape.size, w: value },
    } as Partial<ShapeProps>);
  };

  const setHeight = (value: number) => {
    if (!currentShape) return;
    onUpdate({
      size: { ...currentShape.size, h: value },
    } as Partial<ShapeProps>);
  };

  React.useEffect(() => {
    //onUpdate({ size: { h: size.h, w: size.w } });
  }, []);

  return (
    <PanelRow title="Size">
      <div className="grid grid-cols-2 gap-2">
        <InputContainer
          icon={<WIcon />}
          value={currentShape?.size.w}
          onChange={(value: number) => setWidth(value)}
        />
        <InputContainer
          icon={<HIcon />}
          value={currentShape?.size.h}
          onChange={(value: number) => setHeight(value)}
        />
      </div>
    </PanelRow>
  );
};

const InputContainer = (props: {
  icon: ReactElement;
  onChange?: CallableFunction;
  value?: number;
}) => {
  const { icon, value: defaultValue = undefined, onChange, ...rest } = props;
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <label
      id="width"
      className="border border-solid h-6 flex flex-row w-full items-center bg-gray-100 rounded-[5px] overflow-hidden hover:border-gray-300"
    >
      <span className="flex-none px-.5 h-6 w-6 flex items-center justify-center">
        {icon}
      </span>
      <div className="flex w-full pr-2">
        <input
          id="width"
          type="number"
          value={value}
          className="w-full outline-none border-none bg-transparent rounded-none flex-grow text-xs font-medium appearance-none cursor-default"
          onChange={(event) => {
            const val = parseInt(event.target.value);
            setValue(val);
            onChange?.(val);
          }}
        />
      </div>
    </label>
  );
};

const PanelRow = (props: { children: ReactNode; title: string }) => {
  const { children, title, ...rest } = props;

  return (
    <div className="px-6 py-4 flex flex-col space-y-2 border-t border-solid border-gray-200">
      <h4 className="text-xs font-bold">{title}</h4>
      {children}
    </div>
  );
};
