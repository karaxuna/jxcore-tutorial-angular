// create main angular module
var app = angular.module('app', []);

// create factory that calls server functions
app.factory('jxcoreSrvc', ['$q', function (q) {
    return {
        callAsyncFunction: function (name, data) {
            var defered = q.defer();
            jxcore(name).call(data, function(result, err){
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
            log('Client: Answer received - ' + result);
            scope.result = result;
        }, function (err) {
            log('Client error: ' + err);
        });
        log('Client: Server function called');
    };
}]);

// log notifications on interface
function log(txt) {
    var el = document.createElement('div');
    el.textContent = txt;
    document.body.appendChild(el);
}

// start angular after jxcore is ready
(function check() {
    if (typeof jxcore === 'undefined') {
        setTimeout(check, 5);
    } else {
        log('Client: JXcore is loaded.');
        jxcore('log').register(log);
        jxcore('app.js').loadMainFile(function(ret, err) {
            if (err) {
                log(err);
            } else {
                angular.bootstrap(document, [app.name]);
            }
        });
    }
})();
