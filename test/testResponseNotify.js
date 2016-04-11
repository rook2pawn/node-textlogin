var textlogin = require('../index')('form');
var test = require('tape')
var EE = require('events').EventEmitter;

test('testResponse', function(t) {
    var notify = new EE;
    notify.on('done', function(resp) {
        t.deepEquals({username:'blitzcrank',password:'beep-boop'}, resp);
        t.end();
    });

    textlogin
    .title("Beep Boop Industries")
    .add({key:'username',value:'blitzcrank'})
    .add({key:'password',value:'beep-boop',display:'hidden'})
    .notify(notify)
    .done();
});
