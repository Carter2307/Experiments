import React from "react";
import classNames from "classnames";
import {LoaderCircle} from "lucide-react";

interface SpinnerProps extends React.ComponentProps<"span"> {
    size?: number;
}

export function Spinner(props: SpinnerProps) {
    const { size = 16, className, ...rest } = props;
    const cn = classNames(className, "animate-spin");

    return (
        <span className={cn} {...rest}>
      <LoaderCircle size={size} />
    </span>
    );
}
