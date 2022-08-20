export default class ApiCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchContry() {
    const url = `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(r => {
      if (!r.ok) {
        throw new Error(r.status);
      }
      return r.json();
    });
  }
}
