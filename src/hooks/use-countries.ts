import countries, { Country } from 'world-countries';

const formattedCountries = countries.map((country: Country) => ({
	value: country.cca2,
	label: country.name.common,
	flag: country.flag,
	latlng: country.latlng,
	region: country.region
}));

export const useCountries = () => {
	const getAll = () => formattedCountries;

	const getByValue = (value: string) => formattedCountries.find((item) => item.value === value);

	return {
		getAll,
		getByValue
	};
};
