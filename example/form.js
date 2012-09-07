var textlogin = require('../index')('form');
textlogin
    .title("Beep Boop Industries")
    .add({key:'username',value:''})
    .add({key:'password',value:'',display:'hidden'})
    .success(function(resp) {
        console.log("results:");console.log(resp);
    })
    .start();
