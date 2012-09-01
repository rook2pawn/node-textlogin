var textlogin = require('../index')();
var test = require('tap').test;

// this test does not invoke .start
// because rawMode is not available in non-tty
// instead we call done
test('testResponse', function(t) {
    textlogin
    .title("Beep Boop Industries")
    .add({key:'username',value:'blitzcrank'})
    .add({key:'password',value:'beep-boop',display:'hidden'})
    .success(function(resp) {
        t.deepEquals({username:'blitzcrank',password:'beep-boop'}, resp);
        t.end();
    })
    .done();
});
