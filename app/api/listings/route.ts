import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";



export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        doorCount,
        mileCount,
        passengerCount,
        location,
        locationState,
        locationCountry,
        price,
    } = body;

    // Object.keys(body).forEach((value: any) => {
    //     if (!body[value]) {
    //         NextResponse.error();
    //     }
    // });

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            doorCount,
            mileCount,
            passengerCount,
            locationValue: location.value,
            locationState: locationState.value,
            locationCountry: locationCountry.value,
            price: parseInt(price, 10),
            userId: currentUser.id
        }
    });

    return NextResponse.json(listing);
}