
const rateEl = document.getElementById("rate");
const swapEl = document.getElementById("swap");
const currencyOneEl = document.getElementById("currency-one");
const currencyTwoEl = document.getElementById("currency-two");
const amountOneEl = document.getElementById("amount-one");
const amountTwoEl = document.getElementById("amount-two");

console.log(rateEl);
console.log(swapEl);
console.log(currencyOneEl);
console.log(currencyTwoEl);
console.log(amountOneEl);
console.log(amountTwoEl);

let ratesFromBack = {};

const getData = () => {
  const currencyOne = currencyOneEl.value;
  const currencyTwo = currencyTwoEl.value;

  fetch(`https://v6.exchangerate-api.com/v6/41b4541f3df8b629ff6e1018/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const { conversion_rates } = data;
      ratesFromBack = { ...conversion_rates };
      calculateRates(currencyTwo, conversion_rates);
    });
};

const calculateRates = (currencyTwo, data) => {
  const rates = data[currencyTwo];
  amountTwoEl.value = (+amountOneEl.value * rates).toFixed(2);
  rateEl.innerText = `1 ${currencyOneEl.value} = ${rates} ${currencyTwoEl.value}`;
};

const runCalculateRates = () => {
  calculateRates(currencyTwoEl.value, ratesFromBack);
};


const swapCurrencies = () => {
  const tempCurrency = currencyOneEl.value;
  currencyOneEl.value = currencyTwoEl.value;
  currencyTwoEl.value = tempCurrency;

  const tempRates = ratesFromBack[currencyOneEl.value];
  ratesFromBack[currencyOneEl.value] = ratesFromBack[currencyTwoEl.value];
  ratesFromBack[currencyTwoEl.value] = tempRates;

  runCalculateRates();
};


getData();
console.log(ratesFromBack.EUR);


currencyOneEl.addEventListener('change', getData);
currencyTwoEl.addEventListener('change', runCalculateRates);
amountOneEl.addEventListener('input', runCalculateRates);
swapEl.addEventListener('click', swapCurrencies);














