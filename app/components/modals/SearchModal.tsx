'use client';

import qs from "query-string";
import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CitySelectValue, CountrySelectValue, StateSelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CitySelectValue>();
    const [locationState, setLocationState] = useState<StateSelectValue>();
    const [locationCountry, setLocationCountry] = useState<CountrySelectValue>();

    const [step, setStep] = useState(STEPS.LOCATION);
    const [passengerCount, setPassengerCount] = useState(1);
    const [doorCount, setDoorCount] = useState(1);
    const [mileCount, setMileCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    // const Map = useMemo(() => dynamic(() => import('../Map'),{
    //     ssr: false,
    // }), [location]);
    const Map = useMemo(() => dynamic(() => import('../Map'),{
        ssr: false,
    }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback( async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            passengerCount,
            doorCount,
            mileCount
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [
        step,
        searchModal,
        location,
        router,
        passengerCount,
        doorCount,
        mileCount,
        dateRange,
        onNext,
        params
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
         if (step === STEPS.LOCATION) {
            return undefined;
         }

         return 'Back';
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect 
                value={location}
                locationState={locationState}
                locationCountry={locationCountry}
                onChange={(value) => setLocation(value as CitySelectValue)}
                onChangeState={(locationState) => setLocationState(locationState as StateSelectValue)}
                onChangeCountry={(locationCountry) => setLocationCountry(locationCountry as CountrySelectValue)}
            />
            < hr />
            <Map center={location?.latlng} />
        </div>
    )

    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="When do you plan to go ?"
                    subtitle="Make sure everyone is free!"
                />
                <Calendar 
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        )
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading 
                    title="More information"
                    subtitle="Find your perfect car!"
                />
                <Counter 
                    title="Passengers"
                    subtitle="How many passengers are traveling ?"
                    value={passengerCount}
                    onChange={(value) => setPassengerCount(value)}
                />
                <Counter 
                    title="Doors"
                    subtitle="How many doors does the car need ?"
                    value={doorCount}
                    onChange={(value) => setDoorCount(value)}
                />
                <Counter 
                    title="Mileage"
                    subtitle="Desired fuel efficiency ?"
                    value={mileCount}
                    onChange={(value) => setMileCount(value)}
                />
            </div>
        )
    }

    return (
        <Modal 
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
}

export default SearchModal;