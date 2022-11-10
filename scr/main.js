// todo importing the data from world api
import axios from "axios";

// functie voor ophalen data all countries
(async function fetchData () {
    try {
        const countriesData = await axios.get('https://restcountries.com/v3.1/all');
        console.log(countriesData)
        countriesData.data.sort((a,b) =>  a.population - b.population);

        countriesData.data.map((entryData) => {

            const{ name: { common }, flags:{ png }, population, continents} = entryData;
            const[mainContinent, ...rest] = continents;

            const countrySection = document.getElementById('container-country-information')

            const country = document.createElement("article");
            country.setAttribute("class", "country");
            countrySection.appendChild(country);

            const flagAndTitleWrapper = document.createElement('div');
            flagAndTitleWrapper.setAttribute('class','flag-and-title-wrapper');

            const p = document.createElement('p');

            p.textContent = `Has a population of ${population} people`;

            country.appendChild(flagAndTitleWrapper);
            country.appendChild(p)

            const imageWrapper = document.createElement('div');
            imageWrapper.setAttribute('class','imagewrapper');

            const h2 = document.createElement("h2");
            h2.setAttribute('class',mainContinent);

            h2.textContent = common;

            flagAndTitleWrapper.appendChild(imageWrapper);
            flagAndTitleWrapper.appendChild(h2)

            const flag = document.createElement("img");
            flag.setAttribute('src', png);
            flag.setAttribute('alt', 'flag');

            imageWrapper.appendChild(flag);



        })


    } catch (e){
    //todo uitzonderingen toevoegen
    }
})()

//function for fetching data for the search function
function listingElementsCurrenciesAndLanguages(array) {
    if(array.length===1){
        return array[0].name;
    } else {
        let stringPlaceholder = array[0].name
        for (let i = 1; i < array.length; i++) {
            if (i===(array.length-1)) {
                stringPlaceholder += " en " + array[i].name;
            } else {
                stringPlaceholder += ", " + array[i].name;
            }
        }
        return stringPlaceholder;
    }
}
async function fetchDataSearch () { // todo countryName weer toevoegen
    try {
        const testCountryname = 'peru'
        const countryName = testCountryname;
        const dataOneCountry = await axios.get(`https://restcountries.com/v2/name/${countryName}`,{
            params: {
              fields: 'flags,name,region,population,capital,currencies,languages'
            }
        })
        console.log(dataOneCountry);

        dataOneCountry.data.map((countryOne) => {
            const {flags, name, capital, region, population, currencies,languages} = countryOne;
            const countryBox = document.getElementById('country-box');

        })








    } catch (e) {

    }

}

const searchField = document.getElementById('country-searching-field');
const button = document.getElementById('search-button');

button.addEventListener('click',()=> {
    if (searchField.value!=="") {
        fetchDataSearch(searchField.value);
        searchField.value = '';
    }

})

searchField.addEventListener("keydown", (event) =>{

    if(event.code==="Enter") {



        if (searchField.value!=="") {
            fetchDataSearch(searchField.value);
            searchField.value = '';
        }
    }
});







