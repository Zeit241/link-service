import {Skeleton} from "@/app/(components)/ui/skeleton"

export default function AuthLoading() {
    return (
        <>
            <div>
                <Skeleton className={"h-[350px] w-[350px]"}/>
            </div>
        </>
    )
}
