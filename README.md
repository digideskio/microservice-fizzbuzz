# microservice fizzbuzz

## The Challenge:

Break up "fizzbuzz" into as many microservices as possible. Ideally, each
microservice would be written in a different language, with as many people
participating as makes sense, and each join point using a different protocol
or service.

Entirely inspired by https://github.com/EnterpriseQualityCoding/FizzBuzzEnterpriseEdition

For reasons of sanity, I think we should commit to using a monorepo and
docker-compose so that it's possible/easy to run locally.

## OG fizzbuzz

Here's *an* implementation of fizzbuzz, just so we have something to talk
about.

```js
'use strict';
const range = require('lodash.range');

const numbers = range(1, 101); // numbers from 1 to 100

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

results.forEach((r) => console.log(r));
```

The way I see it, these components are viable microservices:

* A fronting API w/ SPA to allow for controlling the fizzbuzz
  implementation--allowing to pass in custom ranges and receive the output
* An API for generating ranges of numbers for processing
* A service that collects divisible-by-three
* A service that collects divisible-by-five
* A service that &&s divisible-by-three and divisible-by-five (perhaps this
  service calls the other two)
* A service that generates a fizz, buzz, fizzbuzz or null based on divisibility
  parameters
* A service that knows the original number, and can convert the null to the original number, and "push" that result
* BONUS: A memoization layer

## Current Tasks:

* Criticize my implementation of fizzbuzz
* Iron out any concerns about The Rules
* Let me know if you want in
* Define concrete service boundaries
* Agree on communication protocols across service boundaries (there should be lots of variety, I'd like to see both queues and dbs)
* Commit to building a service
* Build up docker-compose infrastructure
