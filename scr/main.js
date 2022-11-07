// voorbeeld voor gebruiken package

import giveMeAJoke from 'give-me-a-joke';

giveMeAJoke.getRandomDadJoke((joke)=> {
    console.log(joke);

    //voorbeeld voor testen
})
function add(number1,number2) {
    return number1+number2;
}

function findByName(array, user){
    const result = array.find((name) => name.name === user);
    if (result) {
        return result
    } else {
        return null;
    }
}
module.exports = {
    add: add,
    findByName,
}