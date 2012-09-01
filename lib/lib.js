var altchars = {
    hidden_unicode : '·',
    hidden : '·',
    hidden_ascii : '*'
};

exports.key = function (ch,key) {
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause()
    } 
    var ord = ch.charCodeAt(0);
    if ((ord >= 33) && (ord <= 126)) {
        this.field = this.field.concat(ch);
        var display = this.fields[this.active].display;
        if (display !== undefined) {
            this.charm.write(altchars[display]);
        } else {
            this.charm.write(ch); 
        }
    } else if (key.name && key.name == 'backspace') {
        if (this.field.length > 0) { 
            this.field = this.field.slice(0,-1);
            this.charm.move(-1,0);
            this.charm.erase('end');
        }
    } else if (key.name && key.name == 'enter') {
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
                process.stdin.pause()
            }
        } 
    }
};
