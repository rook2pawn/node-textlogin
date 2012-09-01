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

Methods
=======

.title('<titlename>')
-------------------
Sets the title name


.add({key:'<key'>, value: '<initial value>', display:'<hidden|hidden_ascii>'})
------------------------------------------------------------------------------

Adds a field named '<key>' with initial value '<initial value>'.
Display field is optional and can be one of the following two: hidden or hidden_ascii.
Use hidden_ascii if you want a simple '*' for your display value.

.success(<cb>)
--------------

Callback will be called after all keys have their associated values filled in, being passed the response object, i.e.

    [{key:'username', value:'blitzcrank'},
     {key:'password', value:'beepboop', display:'hidden'}]

