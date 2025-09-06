import {CRAFTS} from "@/constant/crafts";

export function useCraft(pathname: string) {
    const founded  =  CRAFTS.map(craft => {
        return craft.items.filter(item => pathname.includes( item.slug))[0];
    })[0];

    if(!founded) {
        console.error(`${pathname} does not exist in crafted items`);
        return;
    }

    return founded;
}