var rrunr = require("./rrunr");
var airportdata = require("./airportdata");
var _ = require("underscore");

function convertIcaoToIata(icao) {
	var icaoIndex = 5;
	var iataIndex = 4;
	var matchedRow = _.filter(airportdata, function(dataRow) {
		return dataRow[icaoIndex] == icao.toUpperCase();
	})[0];
	return matchedRow[iataIndex];
}

function predict(options, callback) {
	// flight number
	var carrier = options.uniqueCarrier;

	// TODO: add weather data
	var origin = convertIcaoToIata(options.origin);

	var date = new Date();
	var day=date.getDay() + 1;
	var month = date.getMonth() + 1;

	// call R

	arguments = origin + " " + carrier;
	console.log(arguments);
	rrunr(arguments, function(routput) {
		// parse R output
		callback(routput);
	});
}

module.exports = predict;
