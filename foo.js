
    var textlogin = require('./')('form');
    textlogin
      .title("Beep Boop Industries")
      .add({key:'username',value:''})
      .add({key:'password',value:'',display:'hidden'})
      .success(function(response) {
          // response == {username:<entered username>, password:<entered password>}
      })  
      .start();

/*

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
*/
