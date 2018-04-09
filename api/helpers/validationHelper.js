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
	}  	
};
