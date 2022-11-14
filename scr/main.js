// importing the data from world api
import axios from "axios";
import {domainToUnicode} from "url";

const countrySection = document.getElementById('container-country-information');



// functie voor ophalen data all countries
(async function fetchData() {
    try {
        const countriesData = await axios.get('https://restcountries.com/v3.1/all'); //todo all weer terug zetten

        countriesData.data.sort((a, b) => a.population - b.population); // sorting the countries from low to high on population

        countriesData.data.map((entryData) => { //creating HTML elements and putting data in them

            const {name: {common}, flags: {png}, population, continents} = entryData;
            const [mainContinent, ...rest] = continents;

            const country = document.createElement("article");
            country.setAttribute("class", "country");
            countrySection.appendChild(country);

            const flagAndTitleWrapper = document.createElement('div');
            flagAndTitleWrapper.setAttribute('class', 'flag-and-title-wrapper');

            const p = document.createElement('p');

            p.textContent = `Has a population of ${population} people`;

            country.appendChild(flagAndTitleWrapper);
            country.appendChild(p)

            const imageWrapper = document.createElement('div');
            imageWrapper.setAttribute('class', 'imagewrapper');

            const h2 = document.createElement("h2");
            h2.setAttribute('class', mainContinent);

            h2.textContent = common;

            flagAndTitleWrapper.appendChild(imageWrapper);
            flagAndTitleWrapper.appendChild(h2)

            const flag = document.createElement("img");
            flag.setAttribute('src', png);
            flag.setAttribute('alt', 'flag');

            imageWrapper.appendChild(flag);


        })


    } catch (e) {
        const {status, statusText} = e.response;

        const errorMessage = document.createElement('h2')

        if (status === 404) {
            errorMessage.textContent = `Country data is missing. ${status}:${statusText}`;
        }else if (status === 500) {
            errorMessage.textContent = `${status}:${statusText}`
        }

        countrySection.appendChild(errorMessage);

    }
})()

// function for turning the information about currencies and languages in a nice presentable string
function listingElementsCurrenciesAndLanguages(array) {
    if (array.length === 1) {
        return array[0].name;
    } else {
        let stringPlaceholder = array[0].name
        for (let i = 1; i < array.length; i++) {
            if (i === (array.length - 1)) {
                stringPlaceholder += " en " + array[i].name;
            } else {
                stringPlaceholder += ", " + array[i].name;
            }
        }
        return stringPlaceholder;
    }
}

const searchField = document.getElementById('country-searching-field');
let searchFieldValuePlaceholder = ''; //To store the value of the searchfield until enter or search is hit again
const button = document.getElementById('search-button');

//function for fetching data for the search function
async function fetchDataSearch(countryName) {
    try {
        const dataOneCountry = await axios.get(`https://restcountries.com/v2/name/${countryName}`, {
            params: {
                fields: 'flags,name,region,population,capital,currencies,languages'
            }
        })

        const sectionCountries = document.getElementById('country-box');
        const divWrapper = document.createElement('div');
        divWrapper.setAttribute('class', 'wrapper-country-article');

        sectionCountries.textContent = ""; //removing all child elements from the previous search

        sectionCountries.appendChild(divWrapper);


        dataOneCountry.data.map((countryOne) => { // creating elements and filling them with content
            const {flags: {png}, name, capital, region, population, currencies, languages} = countryOne;

            // constructing the html


            const countryBoxArticle = document.createElement('article');
            countryBoxArticle.setAttribute('class', 'country-box__article');

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
            imageFlag.setAttribute('src', png);
            imageFlag.setAttribute('alt', '')

            flagWrapper.appendChild(imageFlag);

            const nameLI = document.createElement('li');
            const capitalLI = document.createElement('li');
            const regionLI = document.createElement('li');
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

        const {status, statusText} = e.response;

        const errorMessage = document.createElement('h2')

        errorMessage.textContent = `Computer says "no". Good luck with your life`

        if (status === 404) {
            errorMessage.textContent = `"${searchFieldValuePlaceholder}" is not (part of) a country name`;

        } else if (status === 500) {
            errorMessage.textContent = `${status}:${statusText}`
        }

        const sectionCountries = document.getElementById('country-box');
        const divWrapper = document.createElement('div');
        divWrapper.setAttribute('class', 'wrapper-country-article');

        sectionCountries.textContent = "";
        sectionCountries.appendChild(divWrapper);

        const countryBoxArticle = document.createElement('article');
        countryBoxArticle.setAttribute('class', 'country-box__article');

        divWrapper.appendChild(countryBoxArticle);


        countryBoxArticle.appendChild(errorMessage);


    }
}


    button.addEventListener('click', () => { // click event for searchfield button
        if (searchField.value !== "") {
            fetchDataSearch(searchField.value);
            searchFieldValuePlaceholder = searchField.value
            searchField.value = '';
        }

    })

    searchField.addEventListener("keydown", (event) => {// enter event for searchfield

        if (event.code === "Enter") {

            if (searchField.value !== "") {
                fetchDataSearch(searchField.value);
                searchFieldValuePlaceholder = searchField.value
                searchField.value = '';
            }
        }
    });







