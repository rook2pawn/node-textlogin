var keypress = require('keypress');
var charm = require('charm');
var lib = require('./lib/lib');

var exports = module.exports = function(obj) {
    var textlogin = new TextLogin;
    return textlogin;
}; 

function TextLogin() {
    this.field = "";
    this.active = 0;
    this.fields = []; 
    this.props = {};
    this.cb = undefined;
    this.charm = charm();
    this.done = function() {
        this.cb(this.fields);
    };
};

TextLogin.prototype.title = function(title) {
    this.props.title = title;
    return this;
};

TextLogin.prototype.add = function(params) {
    this.fields.push(params);
    return this;
};

TextLogin.prototype.success = function(cb) {
    this.cb = cb; 
    return this;
};

TextLogin.prototype.start = function() {
    keypress(process.stdin);
    if (process.stdin.setRawMode)
        process.stdin.setRawMode(true)
    else
        require('tty').setRawMode(true)
    this.charm.pipe(process.stdout);
    this.charm.erase('screen');
    if (this.props.title !== undefined) {
        this.charm.position(1,1);
        this.charm.write(this.props.title);
    }
    if (this.fields.length > 0) {
        this.charm.position(1,2);
        this.charm.write(this.fields[this.active].key + ": ");
    }
    process.stdin.on('keypress', lib.key.bind(this));
    process.stdin.resume();
    return this;
};

TextLogin.prototype.end = function() {
    this.done();    
};
