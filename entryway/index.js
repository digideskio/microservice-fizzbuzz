'use strict';
const range = require('lodash.range');

module.exports = function fizzbuzz(numbers) {
  const results = [];

  numbers.forEach((number) => {
    let isDivisibleByThree = !(number % 3);
    let isDivisibleByFive = !(number % 5);
    let isDivisibleByBothThreeAndFive = isDivisibleByThree && isDivisibleByFive;

    if (isDivisibleByBothThreeAndFive) {
      results.push('fizzbuzz');
    } else if (isDivisibleByThree) {
      results.push('fizz');
    } else if (isDivisibleByFive) {
      results.push('buzz');
    } else {
      results.push(number);
    }
  });

  return results;
};

