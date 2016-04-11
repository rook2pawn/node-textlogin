[![Build Status](https://travis-ci.org/rook2pawn/node-textlogin.svg?branch=master)](https://travis-ci.org/rook2pawn/node-textlogin)

node-textlogin
==============

Textlogin is a module that allows you to make FORMS and MENUS in stylish ansi!

* Collect a username, password, and any other fields you want in style!
* Make ansi based menus that call your callback with the item selected
* Make ansi based forms that call your callback with the results


Example (form)
--------------

    var textlogin = require('textlogin')('form');
    textlogin
      .title("Beep Boop Industries")
      .add({key:'username',value:''})
      .add({key:'password',value:'',display:'hidden'})
      .success(function(response) {
          // response == {username:<entered username>, password:<entered password>}
      })  
      .start();

Example (menu)
---------------

    var textlogin = require('textlogin')('menu');
    textlogin
      .title("Blitzster's Restaurant Menu")
      .add({value:'Oily Grog $1.00'})
      .add({value:'Boop Burger $3.50'})
      .add({value:'French Fries $0.50'})
      .success(function(response) {
          // response = {value:<item selected>}
      })  
      .start();

Methods
=======

.title(`<titlename>`)
-------------------
Sets the title name


.add({key:`<key>`, value: `<initial value>`, display:`<hidden|hidden_ascii>`})
------------------------------------------------------------------------------

Adds a field named `<key>` with initial value `<initial value>`.
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

.done
-----

Execute any success callbacks (that were assigned with .success)  or emit any notifications (that were assigned with .notfiy). Also erase all values in parameters set with .add. 

.finish()
---------
Call this when you are completely finished with the interface.


