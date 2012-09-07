var ee = require('events').EventEmitter;
var textlogin = require('../index');
var login = textlogin('form');

var foo = function() {
    var notice = new ee;
    login
        .title("Beep Boop Industries")
        .add({key:'username',value:''})
        .add({key:'password',value:'',display:'hidden'})
        .success(function(resp) {
            notice.emit('done',resp);
        })
        .start();
    return notice;
};
var bar = function() {
    var notice = new ee;
    var menu = textlogin('menu')
    menu
        .title("Blitzster's Restaurant Menu")
        .add({value:'Oily Grog $1.00'})
        .add({value:'Boop Burger $3.50'})
        .add({value:'French Fries $0.50'})
        .success(function(resp) {
            notice.emit('done',resp);
        })  
        .start();
    return notice;
};

var notice = foo();
notice.on('done',function(resp) {
    var notice2 = bar();
    notice2.on('done', function(resp2) {
        console.log("All done."); 
        console.log("Response from login: ");
        console.log(resp);
        console.log("Reponse 2 from menu: ");
        console.log(resp2);
    });
});
