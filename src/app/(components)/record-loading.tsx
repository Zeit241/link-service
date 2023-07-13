import {Skeleton} from "@/app/(components)/ui/skeleton"

export default function RecordLoading() {
    return (
        <>
            <div>
                <Skeleton className={"h-[200px] w-[350px]"}/>
            </div>
        </>
    )
}
