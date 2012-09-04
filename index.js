var keypress = require('keypress');
var charm = require('charm');
var lib = require('./lib/lib');

var exports = module.exports = function(type) {
    var textlogin = new TextLogin(type);
    return textlogin;
}; 

function TextLogin(type) {
    this.marginLeft = 4;
    this.marginTop = 2;
    this.type = type;
    this.field = "";
    this.selection = "";
    this.active = 0;
    this.fields = []; 
    this.props = {};
    this.cb = undefined;
    this.notifyemitter = undefined;
    this.charm = charm();
    if (this.type == 'form') {
        process.stdin.on('keypress', lib.keyform.bind(this));
    } else if (this.type == 'menu') {
        process.stdin.on('keypress', lib.keymenu.bind(this));
    }
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
    if (this.type == 'form') {
        this.fields.forEach(function(hash) {
            obj[hash.key] = hash.value;
        });
    } else if (this.type == 'menu') {
        obj.selection = this.selection;
        this.selection = '';
    }
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
    if (this.type == 'form') {
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
    } else if (this.type == 'menu') {
        this.selection = "";
        if (this.props.title !== undefined) {
            this.charm.position(this.marginLeft,this.marginTop);
            this.charm.write(this.props.title);
            this.charm.position(this.marginLeft,this.marginTop+1);
            for (var i = 0; i < this.props.title.length; i++) {
                this.charm.write('—');
            }
        }
        if (this.fields.length > 0) {
            for (var i = 0; i < this.fields.length; i++) {
                this.charm.position(this.marginLeft,3+i + this.marginTop);
                this.charm.write(i + ') ' + this.fields[i].value);
            }
        }
        this.charm.position(this.marginLeft,this.marginTop + 4  +  this.fields.length);
        this.charm.write("> ");
    }
    process.stdin.resume();
    return this;
};
