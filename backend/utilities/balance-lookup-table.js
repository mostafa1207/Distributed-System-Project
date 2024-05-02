const cardBalances = {};

for (let i = 100; i <= 900; i += 10) {
  cardBalances[i.toString()] = i * 100;
}

getBalance = function (cardPin) {
  const key = cardPin.toString();
  return cardBalances[key];
};

module.exports = { getBalance };
