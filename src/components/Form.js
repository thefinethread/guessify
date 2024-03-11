import { useEffect, useState } from 'react';
import fetchData from '../utils/fetchData';
import fetchCountriesData from '../utils/fetchCountriesData';
import Spinner from './Spinner';

const Form = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userData, setUserData] = useState(null);
  const [countries, setCountries] = useState(null);

  const isNameValid = () => {
    if (!name) {
      setErrorMsg('Please enter at least 1 alphabet.');
      return false;
    }
    if (!name.match('^[a-zA-Z]+$')) {
      setErrorMsg('Only alphabets are allowed.');
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // validation
    if (!isNameValid()) return;

    setLoading(true);
    setName('');

    const { data, error } = await fetchData(name);

    data && parseUserData(data);
    error && setErrorMsg(error);

    setLoading(false);
  };

  const parseUserData = (data) => {
    const countryId = data?.[2]?.country?.[0]?.country_id;

    setUserData({
      name: data?.[0]?.name,
      gender: data?.[1]?.gender,
      country: (countries && countries[countryId]) || countryId,
    });
  };

  useEffect(() => {
    const getCountriesData = async () => {
      const { countriesData } = await fetchCountriesData();
      setCountries(countriesData);
    };
    getCountriesData();
  }, []);

  return (
    <div>
      <form className='w-80' onSubmit={handleFormSubmit}>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name' className='text-zinc-300'>
            Enter Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type='text'
            id='name'
            value={name}
            className='w-full bg-transparent outline-none border-2 border-solid border-zinc-600 rounded-md p-2'
          />
          {errorMsg && <p className='text-xs text-red-500'>{errorMsg}</p>}
        </div>
        <button
          type='submit'
          className={`cursor-pointer flex justify-center items-center mt-10 bg-green-700 w-full text-center py-2 text-lg rounded-md hover:scale-95 transition-transform disabled:scale-100`}
        >
          {loading ? <Spinner /> : 'Guess'}
        </button>
      </form>
      {userData && (
        <ul className='mt-5'>
          <li>Name: {userData?.name}</li>
          <li>Gender: {userData?.gender}</li>
          <li>Country: {userData?.country}</li>
        </ul>
      )}
    </div>
  );
};

export default Form;
