const User = require('../models/User');

module.exports = {
	getUserType: (id) => {
	  	return User.find({
		    where: {
		        id: id,
		  	},
		})
		.then((user) => {
	        if (!user) {
	            return false;
	        } else{
	        	if (user.userAccountType == 'Admin') {
	        		return true;
	        	}
	        }
        })
        .catch((err) => {
		    console.log(err);
		    return false;
        });
	}  	
};
