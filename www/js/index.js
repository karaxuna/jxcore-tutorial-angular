// create main angular module
var app = angular.module('app', []);

// create factory that calls server functions
app.factory('jxcoreSrvc', ['$q', function (q) {
    return {
        callAsyncFunction: function (name, data) {
            var defered = q.defer();
            jxcore(name).call(data, function(err, result){
                if (err) {
                    defered.reject(err);
                } else {
                    defered.resolve(result);
                }
            });
            return defered.promise;
        }
    };
}]);

// indexCtrl
app.controller('indexCtrl', ['$scope', 'jxcoreSrvc', function (scope, jxcoreSrvc) {
    scope.callServerFunction = function () {
        jxcoreSrvc.callAsyncFunction('serverFunction', 'foo').then(function (result) {
            scope.result = result;
        }, function (err) {
            alert(err);
        });
    };
}]);

// start angular after jxcore is ready
(function check() {
    if (typeof jxcore === 'undefined') {
        setTimeout(check, 5);
    } else {
        jxcore.isReady(function () {
            jxcore('app.js').loadMainFile(function(err) {
                if (err) {
                    alert(err);
                } else {
                    angular.bootstrap(document, [app.name]);
                }
            });
        });
    }
})();
