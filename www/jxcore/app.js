Mobile('serverFunction').registerAsync(function(message, callback){
    setTimeout(function() {
        callback(message + ' bar');
    }, 500);
});