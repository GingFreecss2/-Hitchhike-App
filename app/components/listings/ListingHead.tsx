'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeaProps {
    title: string;
    locationValue: string;
    locationCountry: string;
    locationState: string;
    imageSrc: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeaProps> = ({
    title,
    locationValue,
    locationState,
    locationCountry,
    imageSrc,
    id,
    currentUser
}) => {
    const {getByValue, getCityByFields} = useCountries();

    const country = getByValue(locationCountry);
    const location = getCityByFields(locationCountry, locationState, locationValue);

    return (
        <>
            <Heading 
                title={title}
                subtitle={`${location?.label},${country?.label}`}
            />
            <div 
                className="
                    w-full
                    h-[60vh]
                    overflow-hidden
                    rounded-xl
                    relative
                "
            >
                <Image 
                    alt="Image"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
}

export default ListingHead;