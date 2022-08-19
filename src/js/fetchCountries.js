import Notiflix from 'notiflix';
export default class ApiCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchContry() {
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
    const countryInfo = document.querySelector('.country-info');
    const countryList = document.querySelector('.country-list');
    fetch(url)
      .then(r => {
        if (!r.ok) {
          throw new Error(r.status);
        }
        return r.json();
      })
      .then(r => {
        countryInfo.classList.add('is-hidden');
        countryList.classList.add('is-hidden');
        if (r.length === 1) {
          countryInfo.classList.remove('is-hidden');
          countryList.classList.add('is-hidden');
          countryInfo.innerHTML = `<ul class="contry-list">
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
        } else if (r.length >= 2 && r.length <= 10) {
          countryInfo.classList.add('is-hidden');
          countryList.classList.remove('is-hidden');
          countryList.innerHTML = '';
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
          countryList.insertAdjacentHTML('beforeend', listOFCountries);
        } else if (r.length > 10) {
          countryInfo.classList.add('is-hidden');
          countryList.classList.add('is-hidden');
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(error => {
        countryInfo.classList.add('is-hidden');
        countryList.classList.add('is-hidden');
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
