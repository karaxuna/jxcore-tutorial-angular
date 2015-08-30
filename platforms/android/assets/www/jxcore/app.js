var log = Mobile('log');

log.call('Server: JXcore is running.');

Mobile('serverFunction').registerAsync(function(message, callback){
    log.call('Server: Message received - ' + message);
    setTimeout(function() {
        callback(message + ' bar');
    }, 500);
});