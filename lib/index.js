var altchars = {
    hidden_unicode : '·',
    hidden : '·',
    hidden_ascii : '*'
};

var isEnter = function(key) {
  return (key.name && ((key.name == 'enter') || (key.name == 'return')))
}

var showselection = function(num) {
    for (var i = 0; i < this.fields.length; i++) {
        this.charm.position(this.marginLeft-1,this.marginTop + 3 + i);
        this.charm.erase('start');
    }
    this.charm.position(this.marginLeft-1,this.marginTop + 3 + num);
    this.lastPos = num;
    this.charm.write('·');
    this.selection = num.toString();
    this.charm.position(this.marginLeft,this.marginTop + 4  +  this.fields.length);
    this.charm.write("> " + num.toString());
}

exports.keymenu = function (ch,key) {
    if (!this.hasOwnProperty('lastPos')) this.lastPos = -1;
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
        process.exit();
    }
    if (key && key.name && key.name == 'down') {
        if (this.lastPos < this.fields.length-1) {
            this.lastPos++;
            showselection.call(this, this.lastPos);
        }
    }  else if (key && key.name && key.name == 'up') {
        if (this.lastPos > 0) {
            this.lastPos--;
            showselection.call(this, this.lastPos);
        }
    } else if (ch !== undefined) {
        var ord = ch.charCodeAt(0);
        if ((ord >= 48) && (ord < 48+this.fields.length)) {
            showselection.call(this, parseInt(ch));
        } else if (isEnter(key) && (this.selection !== ""))  {
            this.done();
        }
    }
};
exports.keyform = function (ch,key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
        process.exit();
    }
    if (ch !== undefined) {
        var ord = ch.charCodeAt(0);
        if ((ord >= 33) && (ord <= 126)) {
            this.field = this.field.concat(ch);
            var display = this.fields[this.active].display;
            if (display !== undefined) {
                this.charm.write(altchars[display]);
            } else {
                this.charm.write(ch);
            }
        } else if (key.name && (key.name == 'backspace')) {
            if (this.field.length > 0) {
                this.field = this.field.slice(0,-1);
                this.charm.move(-1,0);
                this.charm.erase('end');
            }
        } else if (isEnter(key)) {
            if ((this.fields[this.active].value == "") && (this.field.length > 0)) {
                this.fields[this.active].value = this.field;
                this.active++;
                this.field = "";
                this.charm.position(1,3);
                if (this.active < this.fields.length) {
                    this.charm.write(this.fields[this.active].key + ": ");
                } else {
                    this.charm.position(1,4);
                    this.done();
                }
            }
        }
    }
};
