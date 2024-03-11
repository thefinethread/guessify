const fetchCountriesData = async () => {
  try {
    const res = await fetch('http://country.io/names.json');
    const data = await res.json();
    return { countriesData: data };
  } catch (error) {
    return { error };
  }
};

export default fetchCountriesData;
