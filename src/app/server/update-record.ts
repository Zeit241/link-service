"use server";
import {Preferences} from "@prisma/client"
import { prisma } from "@/lib/database";

interface UpdateRecordProps {
    enabled?: boolean;
    description?: string
    profilePicture?: string
    preferences?: Preferences
}

export default async function UpdateRecord(
    id:string,
    data: UpdateLinkProps
): Promise<{ status: number; message: string }> {
    const record = await prisma.record.update({
        where: {
            id: id,
        },
        data: data,
    });

    return { status: 200, message: "Done!" };
}
