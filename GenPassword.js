const bcrypt = require('bcrypt');

var pswrd = bcrypt.hashSync('12345', 9);
console.log(pswrd);