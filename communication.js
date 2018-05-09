const express 										= require('express');
const app 											= express();
const bodyParser 									= require('body-parser')

const authentication 								= require('./src/authentication')
const dataManipulation 								= require('./src/dataManipulation')

// const MongoClient               					= require('mongodb').MongoClient;
// const url                       					= 'mongodb+srv://Ricky:hereitis1@cluster0-ar1xu.mongodb.net/test';


// const db = require("mongo-utility")(url)
// url = "mongodb://Ricky:hereitis1@mycluster0-shard-00-00.mongodb.net:27017,mycluster0-shard-00-01.mongodb.net:27017,mycluster0-shard-00-02.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin"

// mongodb+srv://Ricky:hereitis1!@cluster0-ar1xu.mongodb.net/test

//

////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Testing 
////////////////////////////////////////////////////////////////////////////////////////////////


authentication.h()
// authentication.signIn("email@gmail.com", "password")
// authentication.passwordToSaltHash("email@gmail.com")




// authentication.generateAccessToken()



// db.insert("test", {test: "test"})
// 	.then(test=>{
// 		console.log("insert",test);
// })


// db.findMany("test", {test:"test"})
// 	.then(test=>{
// 		console.log("findmany",test)
// 	}
// )





// MongoClient.connect(url, function(err, db) {
// 	console.log("Connected")
// 	const collection = db.db("test").collection("devices");

// 	// collection.insertOne( { x: 1 } )
// 	// collection.insertOne( { x: 2 } )
// 	// collection.insertOne( { x: 3 } )
// 	// collection.insertOne( { x: 4 } )
// 	// collection.insertOne( { x: 5 } )
// 	// collection.insertOne( { x: 6 } )


// 	// collection.findMany({x:10}).toArray(function(err, docs) {
// 	//     console.log("Found the following records");
// 	//     console.log(docs)
// 	//     console.log(docs.length)
// 	//  })

// 	// .then(console.log("Hello"))





// 	// console.log(db)
// 	// db.myNewCollection2.insertOne( { x: 1 } )
//     // database = db.collection.insert({name:"ricky", password:"up"})
// })


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Server Configurations
////////////////////////////////////////////////////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('json spaces', 2);


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // EndPoints
////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/',function(req, res){ 
    getAnswer(req.body.query)
    .then( (message) => res.send(message) )
})


// app.listen(2999, function(){
//     console.log("Running on 2999")
// })