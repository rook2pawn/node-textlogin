var keypress  = require('keypress');
var charm = require('charm')();
keypress(process.stdin);
if (process.stdin.setRawMode)
    process.stdin.setRawMode(true)
else
    require('tty').setRawMode(true)

var field = "";
var active = 0;
var fields = [];
process.stdin.on('keypress', function (ch, key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
    } 
    var ord = ch.charCodeAt(0);
    if ((ord >= 33) && (ord <= 126)) {
        field = field.concat(ch);
        charm.write(ch); 
    } else if (key.name && key.name == 'backspace') {
        if (field.length > 0) { 
            field = field.slice(0,-1);
            charm.move(-1,0);
            charm.erase('end');
        }
    } else if (key.name && key.name == 'enter') {
        if ((fields[active].value == "") && (field.length > 0)) {
            fields[active].value = field;
            active++;
            field = "";
            charm.position(1,3);
            if (active < fields.length) {
                charm.write(fields[active].key + ":");
            } else {
                charm.position(1,4);
                charm.write("Done.");
                console.log(fields);
            }
        } 
    }
});

process.stdin.resume();
charm.pipe(process.stdout);
charm.erase('screen');
charm.position(1,1);
charm.write("EpicChess Text Client");
charm.position(1,2);
charm.write("username: ");


var exports = module.exports = function(obj) {
    
}; 
