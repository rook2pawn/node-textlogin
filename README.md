node-textlogin
==============

Collect a username, password, and any other fields you want in style!

    var textlogin = require('./index')();
    textlogin
        .title("Beep Boop Industries")
        .add({key:'username',value:''})
        .add({key:'password',value:'',display:'hidden'})
        .success(function(response) {
        })  
        .start();
