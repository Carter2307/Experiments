import React from "react";
import classNames from "classnames";
import { ArrowLeftIcon } from "lucide-react";
import {Button} from "@/components/Button/Button";

interface BackButtonProps extends React.ComponentProps<"button"> {
    label?: string
}

export function BackButton(props: BackButtonProps) {
    const { children, className, label, ...rest } = props;
    const cn = classNames(className,"!rounded-xl");

    function back() {
        history.back();
    }

    return (
        <Button
            icon={<ArrowLeftIcon />}
            position={"left"}
            label={label || "Back"}
            variant={"secondary"}
            onClick={back}
            className={cn}
        />
    );
}
