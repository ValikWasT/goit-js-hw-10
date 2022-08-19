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
  //   console.log(search.searchQuery);
  search.searchQuery = e.target.value.trim();
  if (search.searchQuery === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    refs.countryInfo.classList.add('is-hidden');
    refs.countryList.classList.add('is-hidden');
    return;
  }
  //   console.log('hi');
  search.fetchContry();
}
