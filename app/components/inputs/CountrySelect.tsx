'use client';

import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';
import { useState } from 'react';

export type CountrySelectValue = {
  flag: string;
  label: string;
  value: string;
}

export type StateSelectValue = {
  countryCode: string;
  label: string;
  value: string;
}

export type CitySelectValue = {
    label: string;
    value: string;
    countryCode: string;
    stateCode: string;
    latlng: number[];
}

export type LocationSelectValue =
  | CitySelectValue
  | StateSelectValue
  | CountrySelectValue;

interface CountrySelectProps {
  value?: CitySelectValue ;
  locationState?: StateSelectValue | null;
  locationCountry?: CountrySelectValue | null;
  // onChange: (value: LocationSelectValue | null) => void;
  // onChangeState: (value: LocationSelectValue | null) => void
  // onChangeCountry: (value: LocationSelectValue | null) => void
  onChange: (value: CitySelectValue ) => void;
  onChangeState: (value: StateSelectValue | null) => void
  onChangeCountry: (value: CountrySelectValue | null) => void
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  locationState,
  locationCountry,
  onChange,
  onChangeState,
  onChangeCountry,
}) => {

  console.log("value", value, locationState, locationCountry, onChange, onChangeState, onChangeCountry)

  const { getAll, getStatesByCountry, getCitiesByState } = useCountries();

  const [selectedCountry, setSelectedCountry] = useState<CountrySelectValue | null>(locationCountry!);
  const [selectedState, setSelectedState] = useState<StateSelectValue | null>(locationState!);
  const [selectedCity, setSelectedCity] = useState<CitySelectValue | null>(value!);
  const [stateOptions, setStateOptions] = useState<StateSelectValue[]>([]);
  const [cityOptions, setCityOptions] = useState<CitySelectValue[]>([]);
  

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption as CountrySelectValue);
    setSelectedState(null);
    setSelectedCity(null);
    if (selectedOption) {
      const countryCode = selectedOption.value;
      const states = getStatesByCountry(countryCode);
      setStateOptions(states);
      // value2 = selectedOption;
    } else {
      setStateOptions([]);
    }
    onChangeCountry(selectedOption as CountrySelectValue);
  };

  const handleStateChange = (selectedOption: any) => {
    setSelectedState(selectedOption as StateSelectValue);
     setSelectedCity(null);
   if (selectedOption) {
        const countryCode = selectedOption.countryCode;
        const stateCode = selectedOption.value;
        const cities = getCitiesByState(countryCode, stateCode).map((city) => ({
            ...city,
            latlng: city.latlng ? city.latlng.map((value) => Number(value)) : [],
          }));
        setCityOptions(cities);
        // value3 = selectedOption;
   } else {
    setCityOptions([]);
   }
   onChangeState(selectedOption as StateSelectValue);
  };

  //  const handleCityChange = (selectedOption: any) => {
  //   setSelectedCity(selectedOption as CitySelectValue);
  //   onChange(selectedOption as LocationSelectValue);
  //   value = selectedOption;
  // };

  return (
    <div>
      <Select
        placeholder="Select a Country"
        isClearable
        options={getAll()}
        value={selectedCountry}
        onChange={handleCountryChange}
        formatOptionLabel={(option: any) => (
          <div className='flex flex-row items-center gap-3'>
            <div>{option.flag}</div>
            <div>
              {option.label}
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ... theme,
          borderRadius: 6,
          colors: {
            ... theme.colors,
            primary: 'black',
            primary25: '#e6e4ff'
          }
        })}
      />
      <hr />
      {selectedCountry &&
        <Select
          placeholder="Select a State"
          isClearable
          options={getStatesByCountry(selectedCountry.value)}
          value={selectedState}
          onChange={handleStateChange}
          formatOptionLabel={(option: any) => (
            <div className='flex flex-row items-center gap-3'>
              <div>{option.label}</div>
            </div>
          )}
          classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg',
          }}
          theme={(theme) => ({
            ... theme,
            borderRadius: 6,
            colors: {
              ... theme.colors,
              primary: 'black',
              primary25: '#e6e4ff'
            }
          })}
        />
      }
      <hr/>
      {selectedCountry && selectedState &&
        <Select
          placeholder="Select a City"
          isClearable
          options={getCitiesByState(selectedState.countryCode, selectedState.value)}
          value={value}
          // onChange={handleCityChange}
          onChange={(value) => onChange(value as CitySelectValue)}
          formatOptionLabel={(option: any) => (
            <div className='flex flex-row items-center gap-3'>
              <div>
                {option.label},
                <span className="text-neutral-500 ml-1">
                {option.countryCode}
              </span>
              </div>
            </div>
          )}
          classNames={{
            control: () => 'p-3 border-2',
            input: () => 'text-lg',
            option: () => 'text-lg',
          }}
          theme={(theme) => ({
            ... theme,
            borderRadius: 6,
            colors: {
              ... theme.colors,
              primary: 'black',
              primary25: '#e6e4ff'
            }
          })}
        />
      }
    </div>
  );
}

export default CountrySelect;
