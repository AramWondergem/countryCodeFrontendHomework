// todo importing the data from world api
import axios from "axios";

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

    }
})()
