'use client';

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    user: SafeUser;
    description: string;
    passengerCount: number;
    doorCount:number;
    mileCount: number;
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined 
    locationValue: string;
    locationCountry: string;
    locationState: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    category,
    locationValue,
    locationCountry,
    locationState,
    doorCount,
    passengerCount,
    mileCount
}) => {
    const { getByValue, getCityByFields } = useCountries();

    const coordinates = getCityByFields(locationCountry, locationState, locationValue)?.latlng;
    // const parsedCoordinates = coordinates?.map(str => {
    //     if (str === undefined || str === null) {
    //       return NaN; // or any other appropriate value for your use case
    //     }
    //     return parseInt(str, 10);
    //   });
    const parsedCoordinates = coordinates?.map(str => {
        if (str === undefined || str === null) {
          return NaN; // or any other appropriate value for your use case
        }
        return parseFloat(String(str));
      });
      

      console.log(parsedCoordinates)

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div
                    className="
                        text-xl
                        font-semibold
                        flex
                        flex-row
                        items-center
                        gap-2
                    "
                >
                    <div>Hosted by {user?.name} </div>
                    <Avatar src={user?.image} />
                </div>
                <div
                    className="
                        flex
                        flex-row
                        items-center
                        gap-4
                        font-light
                        text-neutral-500
                    "
                >
                    <div> {passengerCount} passengers </div>
                    <div> {doorCount} doors </div>
                    <div> {mileCount} L/100km </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={parsedCoordinates} />
        </div>
    );
}

export default ListingInfo;