import {CRAFTS} from "@/constant/crafts";
import Link from "next/link";
import {Divider} from "@/components/Divider/Divider";

export default function Home() {
    return <section className="h-screen w-screen flex flex-col justify-center p-6 overflow-hidden">
        <div className={"w-full max-w-[41rem] mx-auto"}>
            {CRAFTS.map(craft => {
                return <div className={"flex flex-col gap-3"} key={craft.category}>
                    <h3 className={"text-base font-medium pl-3"}>{craft.category}</h3>
                    <ul className={"flex flex-col gap-1"}>
                        {craft.items.map(item => {
                            return <li className={"flex w-full"} key={item.title}>
                                <Link href={item.url} className={"w-full flex flex-row items-center justify-between p-3 rounded-xl hover:bg-gray-50 gap-8"}>
                                    <h4 className={"flex-none text-sm text-gray-950"}>{item.title}</h4>
                                    <Divider/>
                                    <span className={"flex-none text-sm text-neutral-500"}>{item.date}</span>
                                </Link>

                            </li>
                        })}
                    </ul>
                </div>
            })}
        </div>
    </section>;
}
