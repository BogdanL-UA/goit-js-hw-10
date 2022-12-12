const url = 'https://restcountries.com/v3.1';

const fetchCountries = name => {
  return fetch(
    `${url}/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    return response.json();
  });
};

export default { fetchCountries };
