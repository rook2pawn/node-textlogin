var textlogin = require('../index')('menu');
textlogin
    .title("Blitzster's Restaurant Menu")
    .add({value:'Oily Grog $1.00'})
    .add({value:'Boop Burger $3.50'})
    .add({value:'French Fries $0.50'})
    .success(function(response) {
        console.log("response");
        console.log(response.selection);
    })  
    .start();
