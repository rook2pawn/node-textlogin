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
    this.retrycb = undefined;
    this.notifyemitter = undefined;
    this.charm = undefined;
    this.init = false;
};

TextLogin.prototype.title = function(title) {
    this.props.title = title;
    return this;
};

TextLogin.prototype.add = function(params) {
    if (params.value === undefined) {
        throw new Error("TextLogin.add requires {value:'something'}");
    }
    this.fields.push(params);
    return this;
};

TextLogin.prototype.retry = function(cb) {
    this.retrycb = cb; 
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
    if (this.charm !== undefined) {
        this.charm.destroy();
    }
    process.stdin.removeAllListeners('keypress');
};
TextLogin.prototype.clear = function() {
    this.field = "";
    this.selection = "";
    this.active = 0;
    this.fields = []; 
    this.props = {};
    return this;
};
TextLogin.prototype.done = function() {
    process.stdin.pause();
    var obj = {};   
    if (this.type == 'form') {
        this.fields.forEach(function(hash) {
            obj[hash.key] = hash.value;
        });
    } else if (this.type == 'menu') {
        obj.selection = parseInt(this.selection);
        obj.value = this.fields[parseInt(this.selection)].value;
        this.selection = '';
    }
    if (this.cb !== undefined) {
        this.cb(obj);
    }
    if (this.notifyemitter !== undefined) {
        this.notifyemitter.emit('done',obj);
    }
};
TextLogin.prototype.message = function(msg) {
    var box = {
        bottomleft: '╚',
        bottomright: '╝',
        horiz : '═',
        vert : '║',
        topleft : '╔',
        topright: '╗'
    }; 
    var y = 5;
    var x = 25;
    this.charm.position(this.marginLeft + x, y);
    this.charm.write(box.topleft);
    for (var i = 0; i < msg.length; i++) {
        this.charm.write(box.horiz);
    }
    this.charm.write(box.topright);
    for (var i = 1; i < 4 ; i ++) {
        this.charm.position(this.marginLeft + x, y+i);
        this.charm.write(box.vert);
        this.charm.position(this.marginLeft + x + msg.length + 1, y+i);
        this.charm.write(box.vert);
    }
    this.charm.position(this.marginLeft + x, y+4); 
    this.charm.write(box.bottomleft);
    for (var i = 0; i < msg.length; i++) {
        this.charm.write(box.horiz);
    }
    this.charm.write(box.bottomright);
    this.charm.position(this.marginLeft + 1 + x, y + 2);
    this.charm.write(msg);
    
};
TextLogin.prototype.start = function() {
/*
    if (!process.stdout.isTTY) {
        console.log("not in a tty!");
        process.exit();
    }
*/
    if (this.init === false) {
        process.stdin.removeAllListeners('keypress');
        keypress(process.stdin);
        if (this.type == 'form') {
            process.stdin.on('keypress', lib.keyform.bind(this));
        } else if (this.type == 'menu') {
            process.stdin.on('keypress', lib.keymenu.bind(this));
        }
        if (this.charm === undefined) {
            this.charm = charm();
            this.charm.background('black').foreground(47);
        }
        if (process.stdin.setRawMode) 
            process.stdin.setRawMode(true)
        else 
            require('tty').setRawMode(true)
        this.charm.pipe(process.stdout);
    }
    process.stdin.resume();
    if (this.type == 'form') {
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
    } else if (this.type == 'menu') {
        this.selection = "";
        this.charm.erase('screen');
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
                if (this.fields[i].desc !== undefined) {
                    this.charm.write(' - ' + this.fields[i].desc);
                }
            }
        }
        this.charm.position(this.marginLeft,this.marginTop + 4  +  this.fields.length);
        this.charm.write("> ");
    }
    this.init = true;
    return this;
};
