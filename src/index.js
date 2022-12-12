import './css/styles.css';
import debounce from 'lodash.debounce';
import countries from './fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  fetchInput: document.querySelector('#search-box'),
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const { fetchInput, countriesList, countryInfo } = refs;

const onFetchInput = e => {
  const name = e.target.value.trim();
  if (name === '') {
    clearInput();
    return;
  }
  countries.fetchCountries(name).then(renderCountries).catch(onCatch);
};

function renderCountries(countries) {
  clearInput();
  console.log(countries);
  if (countries.length >= 11) {
    clearInput();
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  } else if (countries.length === 1) {
    clearInput();
    const aboutCountry = countries
      .map(({ name, capital, population, flags, languages }) => {
        let lang = '';
        for (let key in languages) {
          lang = languages[key];
        }
        return `
      <div class="country-info-name">
      <ul class="country-list"><li class="country-name"><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li></ul>
      <p>Сapital: ${capital}</p>
      <p>Population: ${population}</p>
      <p>Languages: ${lang}</p>
      </div>
      `;
      })
      .join('');

    countryInfo.insertAdjacentHTML('beforeend', aboutCountry);

    return;
  } else {
    clearInput();
    const nameList = countries
      .map(({ name, flags }) => {
        return `
      <li><img src="${flags.svg}" alt="flag" width='20' height ='15' >${name.official}</li>
      `;
      })
      .join('');

    console.log(nameList);
    countriesList.insertAdjacentHTML('beforeend', nameList);
  }
}

function onCatch(error) {
  if (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name.');
  }
}

function clearInput() {
  countriesList.innerHTML = '';
  countryInfo.innerHTML = '';
}

fetchInput.addEventListener('input', debounce(onFetchInput, DEBOUNCE_DELAY));
