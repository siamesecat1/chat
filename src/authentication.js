const hat 											= require('hat');
const bcrypt 										= require('bcrypt');
const saltRounds 									= 10;
const db 											= require('./db')




////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Front-End
////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Register 
 * 	Make Sure All 3 Fields Are Filled out {Email, Password, Industry}
 * 	Make Sure password has a NUMBER, SPECIAL CHAR, CAPITIAL LETTER, and is at least 8 digits
 * 	Return Error if email Already Taken, Password too short, server error
 * 	
 */

 
/**
 * Login
 * 	Return Error For Incorrect Password, Unrecongized Email, Server Error
 */





////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Functions
////////////////////////////////////////////////////////////////////////////////////////////////

/**
	This access token needs to be generated when users create either a free or paid account.
	This token will be stored in mongodb and be used to check if the user has a valid account
	it will also allow us to set free trials.
	You Can't use the service at all, unless you have an access token
**/
function generateAccessToken(){
	console.log("Generating Access Token")
	return hat();
}




// Check if Email Already in database
function signUp(obj){
	obj.email  = obj.email.toLowerCase()
	return db.findMany("users", {email:obj.email})
			.then( users =>{
				if (users.length !== 0)
					return Promise.reject({ error: "Email Already Taken"});
				return passwordToSaltHash(obj)
			})
			.then(createUser)
			.then( success => {return success})
			.catch(err=>{
				console.log("Signup Error:", err.error)
				return err
				// return {err}
			})
}





/**
	Generate a one-way password hash
**/
function passwordToSaltHash(obj){
	console.log("Creating Password Hash")
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			if (err) reject({error: "generating Salt Error"})
		    bcrypt.hash(obj.password, salt, function(err, hash) {
		    	if (err) reject({error: "generating Hash Error"})
		    	obj['password'] = hash
		    	resolve(obj)
		    });
		});
	}) 
}




function createUser(obj){
	return new Promise((resolve, reject) => {
		console.log("Creating User Obj")
		console.log(obj)
		obj['lastPaid'] = null // Need to check this against todays date to check if the account is still active 
		obj['status'] = "trial" // terminated, active
		obj['gracePeriod'] = 2 // How many days account is active after failure to pay 
		obj['accessToken'] = generateAccessToken() // Have to get Token Through Dashboard
		console.log("user", obj)
		db.insert("users", obj ) 
		resolve({success:true})
	})
}




function signIn(obj){
	obj.email = obj.email.toLowerCase()
	// return new Promise((resolve, reject) => {

		return checkPassword(obj)
			.then(success=>{
				if (success === false)
					return Promise.reject({error: "Wrong Password"})
				return ({status:200}) 
			})	

			.then(success=>{
				console.log("Sign in Successful", success)
				return Promise.resolve(success)
			})
			.catch(err=>{
				console.log("Signing in error:", err.error )
				error = err.error
				return {error}
			})
}




/**
	Check users password against password stored in database
**/
function checkPassword(obj){

	return new Promise((resolve, reject) => {
		 db.findMany("users", {email:obj.email})
		.then(user=> {
			// console.log("USER OBJ", user[0].password)
			if (user.length === 0)
				reject({ error: "Unrecognized Email" });
			bcrypt.compare(obj.password, user[0].password, function(err, res) {
				if (err)
					console.log("ERROR", err)
					// return Promise.reject({ error: err});
				resolve(res)
			});
		})
	})
}



function forgotpassword(){

}

function resetpassword(){

}


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Exports
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	generateAccessToken,
	passwordToSaltHash,
	checkPassword,
	signUp,
	signIn,
	forgotpassword,
	resetpassword
}