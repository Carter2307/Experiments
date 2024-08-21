import classNames from "classnames";
import React from "react";

interface ScrollViewProps extends React.ComponentProps<"section"> {
  mask?: boolean;
  pb?: number; // 128px is great
}

export const ScrollView = (props: ScrollViewProps) => {
  const { className, mask = false, pb=32, ...rest } = props;

  return (
    <section className={classNames("relative h-full overflow-hidden translate-x-0", className)} {...rest}>
      <div className="h-full max-h-full overflow-scroll px-2" style={{paddingBottom: pb}}>{props.children}</div>
      {mask && (
        <span className="absolute bottom-0 left-0 right-0 h-32 w-full bg-gradient-to-t from-white to-[rgba(255, 255, 255,.4)]"></span>
      )}
    </section>
  );
};


ScrollView.displayName="ScrollView";