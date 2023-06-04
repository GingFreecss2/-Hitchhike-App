'use client';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {BiSearch} from 'react-icons/bi';


const Search = () => {
    const searchModal = useSearchModal();
    const params = useSearchParams();
    const { getCityByValue } = useCountries();

    const locationValue = params?.get('locationValue'); 
    const startDate = params?.get('startDate'); 
    const endDate = params?.get('endDate'); 
    const passengerCount = params?.get('passengerCount');
    
    const locationLabel = useMemo(() => {
        if (locationValue) {
            return getCityByValue(locationValue as string)?.label;
        }

        return 'Anywhere';
    }, [getCityByValue, locationValue]);

    const durationLabel = useMemo(() => {
        if (startDate && endDate) {
            const start = new Date(startDate as string);
            const end = new Date(endDate as string);
            let diff = differenceInDays(end, start);
        
            if (diff === 0) {
                diff = 1
            }

            return `${diff} Days`;
        }

        return 'Any week';
    }, [startDate, endDate]);

    const passengerLabel = useMemo(() => {
        if (passengerCount) {
            return `${passengerCount} Passengers`;
          }
      
          return 'Add Passengers';
    },[passengerCount]);

    return (
        <div
        onClick={searchModal.onOpen}
        className="
        border-[1px]
        w-full
        md:w-auto
        py-2
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
        "
        >
             <div className="
             flex
             flex-row
             items-center
             justify-between
             ">
                <div className="
                text-sm
                font-semibold
                px-6
                ">
                    {locationLabel} 
                </div>
                <div className="
                hidden
                sm:block
                text-sm
                font-semibold
                px-6
                border-x-[1px]
                flex-1
                text-center
                ">
                    {durationLabel}
                </div>
                <div className="
                text-sm
                pl-6
                pr-2
                text-gray-600
                flex
                flew-row
                items-center
                gap-3
                ">
                    <div className="hidden sm:block"> {passengerLabel} </div>
                    <div className="
                    p-2
                    bg-blue-500
                    rounded-full
                    text-white
                    ">
                        <BiSearch size={18} />
                    </div>
                </div>
             </div>
        </div>
    );
}

export default Search;