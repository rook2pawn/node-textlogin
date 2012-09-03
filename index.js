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
    this.notifyemitter = undefined;
    this.charm = charm();
    process.stdin.on('keypress', lib.key.bind(this));
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

TextLogin.prototype.notify = function(ee) {
    this.notifyemitter = ee;
    return this;
};
TextLogin.prototype.finish = function() {
    process.stdin.removeAllListeners();
};
TextLogin.prototype.done = function() {
    this.charm.destroy();
    process.stdin.pause()
    var obj = {};   
    this.fields.forEach(function(hash) {
        obj[hash.key] = hash.value;
    });
    if (this.cb !== undefined) {
        this.cb(obj);
    }
    if (this.notifyemitter !== undefined) {
        this.notifyemitter.emit('done',obj);
    }
};

TextLogin.prototype.start = function() {
/*
    if (!process.stdout.isTTY) {
        console.log("not in a tty!");
        process.exit();
    }
*/
    keypress(process.stdin);
    if (process.stdin.setRawMode) 
        process.stdin.setRawMode(true)
    else 
        require('tty').setRawMode(true)
    this.charm.pipe(process.stdout);
    this.charm.erase('screen');
    this.fields.forEach(function(obj) {
        obj.value = "";
    });
    this.active = 0;
    this.field = "";
    if (this.props.title !== undefined) {
        this.charm.position(1,1);
        this.charm.write(this.props.title);
    }
    if (this.fields.length > 0) {
        this.charm.position(1,2);
        this.charm.write(this.fields[this.active].key + ": ");
    }
    process.stdin.resume();
    return this;
};
