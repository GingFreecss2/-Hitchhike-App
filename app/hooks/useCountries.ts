import { Country, State, City } from "morocco-region-city-coordinates";

const formattedCountries = Object.values(Country.getAllCountries()).map((country) => ({
    label: country.name,
    value: country.isoCode,
    flag: country.flag,
}));

const formattedStates = (countryCode: string) => {
    const states = Object.values(State.getStatesOfCountry(countryCode));
    return states.map((state) => ({
      label: state.name,
      value: state.isoCode,
      countryCode : state.countryCode,
    }));
};

const formattedCities = (countryCode: string, stateCode: string) => {
    const cities = City.getCitiesOfState(countryCode, stateCode);
    return cities.map((city) => ({
        label: city.name,
        value: city.name,
        countryCode: city.countryCode,
        stateCode: city.stateCode,
        latlng: [Number(city.latitude), Number(city.longitude)],
    }));
};

const formattedTowns = Object.values(City.getAllCities()).map((city) => ({
    label: city.name,
    value: city.name,
    countryCode: city.countryCode,
    stateCode: city.stateCode,
    latlng: [city.latitude, city.longitude],
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value:string) => {
        return formattedCountries.find((item) => item.value === value);
    };

    const getStatesByCountry = (countryCode: string) => {
        return formattedStates(countryCode);
    };

    const getCitiesByState = (countryCode: string, stateCode: string) => {
        return formattedCities(countryCode, stateCode);
    };

    const getCityByFields = (countryCode:string, stateCode: string, value:string) => {
        return formattedCities(countryCode, stateCode).find((item) => item.value === value);
    };

    const getCityByValue = (value:string) => {
        return formattedTowns.find((item) => item.value === value);
    };

    return {
        getAll,
        getByValue,
        getStatesByCountry,
        getCitiesByState,
        getCityByFields,
        getCityByValue,
    }
};

export default useCountries;
