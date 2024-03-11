import { AGE_URL, COUNTRY_URL, GENDER_URL, SERVER_ERROR } from './constants';

const fetchData = async (name) => {
  const ageApiPromise = fetch(`${AGE_URL}${name}`);
  const genderApiPromise = fetch(`${GENDER_URL}${name}`);
  const countryApiPromise = fetch(`${COUNTRY_URL}${name}`);

  try {
    const responses = await Promise.all([
      ageApiPromise,
      genderApiPromise,
      countryApiPromise,
    ]);

    const data = await Promise.all(responses.map((res) => res.json()));

    return responses?.[0]?.ok
      ? { data }
      : { error: data?.[0]?.error || SERVER_ERROR };
  } catch (err) {
    return { error: err?.message || SERVER_ERROR };
  }
};

export default fetchData;
