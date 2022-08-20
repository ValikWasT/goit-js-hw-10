var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import './css/styles.css';
import ApiCountries from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;

const search = new ApiCountries();

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

refs.countryInfo.classList.add('is-hidden');
refs.countryList.classList.add('is-hidden');

refs.searchInput.addEventListener(
  'input',
  debounce(oninputSearch, DEBOUNCE_DELAY)
);

function oninputSearch(e) {
  search.searchQuery = e.target.value.trim();
  if (search.searchQuery === '') {
    onEmptyString();
    return;
  }
  //   console.log('hi');
  search
    .fetchContry()
    .then(r => {
      console.log(r.length);
      refs.countryInfo.classList.add('is-hidden');
      refs.countryList.classList.add('is-hidden');
      if (r.length === 1) {
        onOneCountry(r);
      } else if (r.length >= 2 && r.length <= 10) {
        onListOfCountry(r);
      } else if (r.length > 10) {
        onMoreCountry();
      }
    })
    .catch(error => {
      onError();
    });
}

function onOneCountry(r) {
  refs.countryInfo.classList.remove('is-hidden');
  refs.countryList.classList.add('is-hidden');
  refs.countryInfo.innerHTML = `<ul class="contry-list">
        <li class="contry-item">
          <img
            src="${r[0].flags.svg}"
            alt="flag"
            width="30"
            height="30"
            class="contry-flag"
          />
          <p class="contry-name">${r[0].name.common}</p>
        </li>
        <li class="contry-item">
          <p class="contry-text">
            <span class="contry-bold">Capital:</span> ${r[0].capital}
          </p>
        </li>
        <li class="contry-item">
          <p class="contry-text">
            <span class="contry-bold">Population:</span> ${r[0].population}
          </p>
        </li>
        <li class="contry-item">
          <p class="contry-text">
            <span class="contry-bold">Languages:</span> ${Object.values(
              r[0].languages
            ).join(', ')}
          </p>
        </li>
      </ul>`;
}

function onListOfCountry(r) {
  refs.countryInfo.classList.add('is-hidden');
  refs.countryList.classList.remove('is-hidden');
  refs.countryList.innerHTML = '';
  const listOFCountries = r
    .map(
      country => `<li class="contry-item">
           <img
             src="${country.flags.svg}"
             alt="flag"
              width="30"
             height="30"
             class="contry-flag"
           />
             <p class="contry-name">${country.name.common}</p>
           </li>`
    )
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', listOFCountries);
}

function onMoreCountry() {
  refs.countryInfo.classList.add('is-hidden');
  refs.countryList.classList.add('is-hidden');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onError() {
  refs.countryInfo.classList.add('is-hidden');
  refs.countryList.classList.add('is-hidden');
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function onEmptyString() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
  refs.countryInfo.classList.add('is-hidden');
  refs.countryList.classList.add('is-hidden');
}
