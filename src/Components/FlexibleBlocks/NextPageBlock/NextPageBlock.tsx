import IFlexibleBlock from "../IFlexibleBlock";
import INextPageBlock from "./INextPageBlock";
import Link from "next/link";

export default function NextPageBlock({ data }: IFlexibleBlock<INextPageBlock>) {
    const { projectLink } = data.nextPageFields!;

    return (
        <div className="mt-60 lg:mt-120">
            <Link
                href={projectLink.url}
                className="group cursor-pointer grid grid-cols-12 gap-20 px-30 bg-[linear-gradient(0deg,_#13284C_0%,_#009BDF_100%)] relative overflow-hidden"
            >
                <div className="col-start-1 col-span-12 lg:col-span-10 lg:col-start-1 my-60 lg:my-120">
                    <p className="text-white uppercase text-24 font-black tracking-tight">visit next project</p>
                    <div className="flex items-center w-full">
                        <h2
                            className="flex-1 text-40 lg:text-132 font-black uppercase leading-72 text-transparent transition-colors duration-500 group-hover:text-white"
                            style={{ WebkitTextStrokeWidth: "1px", WebkitTextStrokeColor: "white" }}
                        >
                            {projectLink.title}
                        </h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}
