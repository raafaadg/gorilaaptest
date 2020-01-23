const functions = require('firebase-functions');
const cdiPrices = require('./prices/cdi.js');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getCDBPrices = functions.https.onRequest((request, response) => {
	const { currentDate, investmentDate, cdbRate } = request.query;

	// currentDate = currentDate.split('-').reverse().join('/');
	// investmentDate = currentDate.split('-').reverse().join('/');

	console.log(currentDate, investmentDate, cdbRate);

	const prices = cdiPrices.filter(price => new Date(price.dtDate.split('/').reverse().join('-')) >= new Date(investmentDate) && new Date(price.dtDate.split('/').reverse().join('-')) <= new Date(currentDate));

	const cdbPrices = prices.map(price => ({date: price.dtDate, unitPrice: (1 + price.dLastTradePrice * (cdbRate / 100))}));

  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	response.setHeader('Access-Control-Allow-Credentials', 'true');
	
	console.log(cdiPrices);
	console.log('Returning cdbPrices:');
	console.log(cdbPrices);

	response.json(cdbPrices);
});
