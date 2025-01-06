import React, { ChangeEvent, ReactNode } from "react";

type ColorPickerProps = {
  value?: string;
};

export default function InputColorPicker(props: ColorPickerProps) {
  const { value = "#000000", ...rest } = props;
  let [color, setColor] = React.useState(value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setColor(value);
  };

  React.useEffect(() => {
    if (color == "") {
      setColor("red");
    }
  }, [color]);

  return (
    <div className="">
      <label
        id="color"
        className="relative border border-solid h-6 flex flex-row w-full items-center bg-zinc-200 rounded-[5px] overflow-hidden hover:border-gray-300"
      >
        <div className="p-1 h-6 w-6">
          <span
            className="flex h-full w-full flex-none h-4 w-4 items-center justify-center rounded-[3px]"
            style={{ background: `${color}` }}
          >
            <input
              id="color"
              type="color"
              onChange={handleChange}
              value={color}
              className="flex w-full h-full border-none rouded-sm absolute z-0 opacity-0 p-0"
            />
          </span>
        </div>

        <div className="flex w-full pr-2">
          <input
            value={color}
            onChange={handleTextChange}
            className="w-full outline-none border-none bg-transparent rounded-none flex-grow text-xs font-medium appearance-none cursor-default"
          />
        </div>
      </label>
    </div>
  );
}
