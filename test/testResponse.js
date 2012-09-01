var textlogin = require('../index')();
var test = require('tap').test;

test('testResponse', function(t) {
    textlogin
    .title("Beep Boop Industries")
    .add({key:'username',value:'blitzcrank'})
    .add({key:'password',value:'beep-boop',display:'hidden'})
    .success(function(resp) {
        t.deepEquals({key:'username',value:'blitzcrank'}, resp[0]);
        t.deepEquals({key:'password',value:'beep-boop',display:'hidden'}, resp[1]);
        t.end();
    })
    .end();
});
