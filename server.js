const express 										= require('express');
const app 											= express();
const bodyParser 									= require('body-parser')

const authentication 								= require('./src/authentication')
const db 											= require('./src/db')
const emailSender 									= require('./src/emailSender')
const brain 										= require('./src/dataManipulation')

const PythonShell 									= require('python-shell');


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Testing 
////////////////////////////////////////////////////////////////////////////////////////////////


// db.findMany("users", {email:"random2"})
// 	.then(test=>{
// 		console.log("findmany", test)
// })




// test_obj = {email:"random5", password:"password"}
// authentication.signUp(test_obj).then(success=> console.log(success))


// authentication.signIn(test_obj).then( (success)=> console.log(success))


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Server Configurations
////////////////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb'}));
app.set('json spaces', 2);

// app.use(express.static(__dirname + '/public'));
app.use(express.static('public'))
app.use(express.static(__dirname + '/views'));
app.set('./views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Pages EndPoints
////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/', function(req,res){
	res.render("index.ejs")
})


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Auth EndPoints
////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/register', function(req, res){ 
	// Send Email. Which Redirects to login?
	console.log("Recieved Body", req.body)
	authentication.signUp(req.body)
		.then(success=> res.send(success))
})



app.post('/signIn', function(req, res){ 
	// On Login create user object with access token
	// This access token needs to be used on almost every page
	console.log("Recieved Body", req.body)
	authentication.signIn(req.body)
		.then( (success) => {
			if(success.error)
				res.status(200).send(success)
			res.send(success)
		})
})


app.post('/emailVerification', function(req, res){
	// Read https://documentation.mailgun.com/en/latest/quickstart-sending.html#add-receiving-mx-records
	// Once Domain in created
	emailSender.sendEmail(req.body.email)
})
  

////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Data EndPoints
////////////////////////////////////////////////////////////////////////////////////////////////

// Here I need to UPLOAD TRAIN and SAVE Models
app.post('/uploadFile', function(req, res){
	// Upload file to databased, need to find user using their access token.
	console.log("UPLOADED FILE DATA", req.body)
})


app.post('/question', function(req, res){
	
})


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Query EndPoints
////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/query', function(req, res){ 
	// brain.getAnswer(req.body.query)
	new Promise(function(resolve, reject){
        var options = {
            mode: 'json',
            args: [req.body.query]
        };

        PythonShell.run('./src/py_com.py', options, function (err, results) {
            if (err) throw err;
            resolve(results)
        });
    })
	.then( (message) => {
		console.log(message[0].data)
		res.send({answer:message[0].data}) 
	})
	.catch((err)=> {console.log("HERE IS THE ERROR:", err)})
})


app.listen(2999, function(){
    console.log("Running on 2999")
})