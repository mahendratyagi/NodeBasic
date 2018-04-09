module.exports = {
	checkNotEmptyFields: (fields) => {
		let message = [];
		let i = 0;
		for(let key in fields) {
		    let value = fields[key];
		    if(!fields[key]){
		    	message[i] = key+' field is required';
		    	i++;
		    }
		}
		return message;
	},
	validName: (name) => {
		const nameReg = /^[A-z]+$/;
  		return nameReg.test(name);
	},
	validEmail: (email) => {
		const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  		return emailReg.test(email);
	},	
	validPassword: (password) => {
		const passReg = /^(?=.{8,})?$/;
  		return passReg.test(password);
	},
};
