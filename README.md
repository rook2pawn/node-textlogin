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

.title('`<titlename>`')
-------------------
Sets the title name


.add({key:'`<key'>`, value: '`<initial value>`', display:'`<hidden|hidden_ascii>`'})
------------------------------------------------------------------------------

Adds a field named '`<key>`' with initial value '`<initial value>`'.
Display field is optional and can be one of the following two: hidden or hidden_ascii.
Use hidden_ascii if you want a simple '*' for your display value.

.success(`<cb>`)
--------------

Callback will be called after all keys have their associated values filled in.
The callback will be passed a response object like so:

    {username:'blitzcrank',
     password:'beep-boop'}

.notify(`<event>`) 
----------------

Optionally, you can pass an event emitter to .notify. It will emit 'done' when it is done, and pass the same response object as .success. You can use either the success callback or the notify event, or both, or none.

.start 
------

Call start to start collection.
