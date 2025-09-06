import React from "react";
import {BackButton} from "@/components/BackButton/BackButton";

export default function FullScreenCraft(props: {children: React.ReactNode}) {
    const { children} = props;

    return <section className={"relative"}>
        <div className={"fixed top-6 left-6 z-50"}>
            <BackButton/>
        </div>
        {children}
    </section>
}