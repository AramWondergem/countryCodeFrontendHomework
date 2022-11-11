// todo importing the data from world api
import axios from "axios";
import {domainToUnicode} from "url";

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
async function fetchDataSearch (countryName) { // todo countryName weer toevoegen
    try {
        const dataOneCountry = await axios.get(`https://restcountries.com/v2/name/${countryName}`,{
            params: {
              fields: 'flags,name,region,population,capital,currencies,languages'
            }
        })
        console.log(dataOneCountry);

        const sectionCountries = document.getElementById('country-box');
        const divWrapper = document.createElement('div');
        divWrapper.setAttribute('class', 'wrapper-country-article');

        sectionCountries.appendChild(divWrapper);


        dataOneCountry.data.map((countryOne) => {
            const {flags: { png }, name, capital, region, population, currencies,languages} = countryOne;

            // constructing the html



            const countryBoxArticle = document.createElement('article');
            countryBoxArticle.setAttribute('class','country-box__article');

            divWrapper.appendChild(countryBoxArticle);

            const countryBoxImageAdnTitleWrapper = document.createElement('div');
            countryBoxImageAdnTitleWrapper.setAttribute('class', 'country-box__image-and-title-wrapper');

            const countryInfoP = document.createElement('p');
            const countryH3 = document.createElement('h3');
            const unorderedInformationCountry = document.createElement('ul')

            countryBoxArticle.appendChild(countryBoxImageAdnTitleWrapper);
            countryBoxArticle.appendChild(countryInfoP);
            countryBoxArticle.appendChild(countryH3);
            countryBoxArticle.appendChild(unorderedInformationCountry);

            const flagWrapper = document.createElement('div');
            flagWrapper.setAttribute('class', 'imagewrapper');

            const countryNameh2 = document.createElement('h2');

            countryBoxImageAdnTitleWrapper.appendChild(flagWrapper);
            countryBoxImageAdnTitleWrapper.appendChild(countryNameh2);

            const imageFlag = document.createElement('img');
            console.log(png)
            imageFlag.setAttribute('src', png);
            imageFlag.setAttribute('alt', '')

            flagWrapper.appendChild(imageFlag);

            const nameLI = document.createElement('li');
            const capitalLI = document.createElement('li');
            const regionLI= document.createElement('li');
            const populationLI = document.createElement('li');
            const currenciesLI = document.createElement('li');
            const languagesLI = document.createElement('li');

            unorderedInformationCountry.appendChild(nameLI)
            unorderedInformationCountry.appendChild(capitalLI)
            unorderedInformationCountry.appendChild(regionLI)
            unorderedInformationCountry.appendChild(populationLI)
            unorderedInformationCountry.appendChild(currenciesLI)
            unorderedInformationCountry.appendChild(languagesLI)




            countryNameh2.textContent = name;
            countryInfoP.textContent = `${name} is situated in ${region}. It has a population of ${population}. The capital is ${capital} and you can pay with ${listingElementsCurrenciesAndLanguages(currencies)}. They speak ${listingElementsCurrenciesAndLanguages(languages)}.`;

            countryH3.textContent = 'Summary';

            nameLI.textContent = name;
            capitalLI.textContent = capital;
            regionLI.textContent = region;
            populationLI.textContent = `population: ${population}`;
            currenciesLI.textContent = listingElementsCurrenciesAndLanguages(currencies);
            languagesLI.textContent = listingElementsCurrenciesAndLanguages(languages);

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







