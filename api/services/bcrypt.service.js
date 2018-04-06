const bcrypt = require('bcrypt-nodejs');

module.exports = {
  password: (user) => {
    const salt = bcrypt.genSaltSync();
    let hash;
    if(user.password){
    	hash = bcrypt.hashSync(user.password, salt);
    } else{
    	hash = bcrypt.hashSync(user.attributes.password, salt);
    }
    return hash;
  },
  comparePassword: (password, hash) => (
    bcrypt.compareSync(password, hash)
  ),
};
