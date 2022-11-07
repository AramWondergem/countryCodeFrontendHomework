const {add, findByName} = require('../scr/main');


test('The add fucntion adds two numbers and returns the sum', () => {
    //arrange

    const number1= 5;
    const number2=10;

    //act
    const sum = add(number1,number2);
    //assert

    expect(sum).toBe(15);
})



test('findByName will return an object from an array with the specified name', ()=>{
    //Arrange
    const usernames = [
        {name: "Piet", id: 1},
        {name: "Klaas", id: 2},
        {name: "Henk", id: 3}
    ];

    const userToFind = "Klaas";

    // Act

    const result = findByName(usernames, userToFind);

    // Arrange

    expect(result).toEqual({name: "Klaas", id: 2})
})

test('findByName will return null if a user is not found', () => {

    //Arrange
    const usernames = [
        {name: "Piet", id: 1},
        {name: "Klaas", id: 2},
        {name: "Henk", id: 3}
    ];

    const userToFind = "Beppie";

    // Act

    const result = findByName(usernames, userToFind);

    // Arrange

    expect(result).toBeNull();

})