const checkEvenOrOdd = (number) => {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            resolve('even');
        } else {
            resolve('odd');
        }
    })
};

const handleResult = (result) => {
    console.log(`The number is ${result}`);
};

const executeCheck = (number, callback) => {
    checkEvenOrOdd(number)
        .then(callback)
};

executeCheck(5, handleResult);
