'use client';

import Container from "../Container";

import {FaCar, FaTruckPickup, FaShuttleVan} from "react-icons/fa";
import {RiRoadsterFill} from "react-icons/ri";
import {GiCaravan, GiTopHat, GiSteeringWheel, GiSurferVan} from "react-icons/gi";
import {IoBatteryChargingOutline, IoPawSharp, IoCarSportSharp, IoDiamond} from "react-icons/io5";
import {MdOutlineFamilyRestroom} from "react-icons/md";
import {FaTruckMonster} from "react-icons/fa";
import {CgPerformance} from "react-icons/cg";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: 'Sedan',
        icon: FaCar,
        description: 'Practical and comfortable, a four-door sedan is your perfect daily ride!'
    },
    {
        label: 'SUV',
        icon: RiRoadsterFill,
        description: 'Sport Utility Vehicle.. Spacious and versatile!'
    },
    {
        label: 'Pick-up',
        icon: FaTruckPickup,
        description: 'A light duty truck with a cabin for passengers and open cargo space for hauling'
    },
    {
        label: 'Van',
        icon: FaShuttleVan,
        description: 'Need extra room for people, luggage or both?'
    },
    {
        label: 'Caravan',
        icon: GiCaravan,
        description: 'A little more than a tent on wheels!'
    },
    {
        label: 'EV',
        icon: IoBatteryChargingOutline,
        description: 'Powered by electricity, completely eliminating your fuel bill and carbon emissions!'
    },
    {
        label: 'Classic',
        icon: GiTopHat,
        description: 'A classy ride for an incredible time.'
    },
    {
        label: 'Sports',
        icon: GiSteeringWheel,
        description: 'Designed with an emphasis on dynamic performance!'
    },
    {
        label: 'Pet Friendly',
        icon: IoPawSharp,
        description: 'Safe and comfortable, a perfect all-in-one ride for you and your pets.'
    },
    {
        label: 'Convertible',
        icon: IoCarSportSharp,
        description: 'Designed to allow an open-air driving experience!'
    },
    {
        label: 'Family Car',
        icon: MdOutlineFamilyRestroom,
        description: 'Accommodates passengers of varying sizes, and meet the needs of the whole family.'
    },
    {
        label: 'Luxury',
        icon: IoDiamond,
        description: 'High-end levels of comfort, features, and equipment.'
    },
    {
        label: 'Off-Road',
        icon: FaTruckMonster,
        description: 'All-terrain vehicle.. rugged vehicles for rough terrain.'
    },
    {
        label: 'Minivan',
        icon: GiSurferVan,
        description: 'A practical and stylish ride to explore the open road.'
    },
    {
        label: 'Muscle Car',
        icon: CgPerformance,
        description: 'Powerful engines designed for high-performance driving!'
    },
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage){
        return null;
    }

    return (
        <Container>
            <div className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto
            ">
                {categories.map((item) => (
                    <CategoryBox 
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
}

export default Categories;