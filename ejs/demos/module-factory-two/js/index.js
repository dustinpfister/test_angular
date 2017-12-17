let app = angular.module('app', []);

app.factory('Fixer', function ($http) {

    return {

        // get the latest data
        latest: function () {

            return $http.get('https://api.fixer.io/latest')

        },

        // use hard coded data in this *.js
        hardCoded: function () {

            return {
                "data": {
                    "base": "EUR",
                    "date": "2017-12-15",
                    "rates": {
                        "AUD": 1.5382,
                        "BGN": 1.9558,
                        "BRL": 3.9171,
                        "CAD": 1.507,
                        "CHF": 1.1669,
                        "CNY": 7.8022,
                        "CZK": 25.678,
                        "DKK": 7.4443,
                        "GBP": 0.88253,
                        "HKD": 9.2223,
                        "HRK": 7.5465,
                        "HUF": 313.43,
                        "IDR": 16029,
                        "ILS": 4.1634,
                        "INR": 75.608,
                        "JPY": 132.45,
                        "KRW": 1284.7,
                        "MXN": 22.628,
                        "MYR": 4.8163,
                        "NOK": 9.7828,
                        "NZD": 1.6803,
                        "PHP": 59.528,
                        "PLN": 4.2167,
                        "RON": 4.6332,
                        "RUB": 69.504,
                        "SEK": 9.9583,
                        "SGD": 1.5897,
                        "THB": 38.375,
                        "TRY": 4.5603,
                        "USD": 1.1806,
                        "ZAR": 15.781
                    }
                },
                "status": 200,
                "config": {
                    "method": "GET",
                    "transformRequest": [null],
                    "transformResponse": [null],
                    "jsonpCallbackParam": "callback",
                    "url": "https://api.fixer.io/latest",
                    "headers": {
                        "Accept": "application/json, text/plain, */*"
                    }
                },
                "statusText": "",
                "xhrStatus": "complete"
            };

        },

        format: function (fixerData) {

            let keys = Object.keys(fixerData.data.rates);

            return keys.map(function (key, i) {

                return {

                    key: key,
                    rate: fixerData.data.rates[key]

                }

            });

        },

        latestFormatted: function () {

            var self = this;

            return new Promise(function (resolve, reject) {

                // first use latest and resolve or reject
                return self.latest().then(function (latest) {

                    console.log('yes');
                    console.log(latest);

                    // resolve with the latest data
                    resolve(latest);

                }).catch (function (e) {

                    console.log('no');
                    reject(e);

                });

            }).then(function (latest) {

                return self.format(latest);

            }).catch (function () {

                return self.format(self.hardCoded);

            });

        }

    };

});

app.factory('DispRates', function () {});

app.controller('fact-control', function ($scope, Fixer) {

    Fixer.latestFormatted().then(function (latest) {

        $scope.rates = latest;
        $scope.$apply();

    }).catch (function () {

        $scope.rates = 'Cound not get Data';

    });

});
