const PythonShell 									= require('python-shell');
const csvtojson                                     = require('csvtojson')
const fs  											= require("fs")


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Functions
////////////////////////////////////////////////////////////////////////////////////////////////

/**
	This function takes in a users query input and then runs a python script that uses machine learning to 
	determine the correct response
**/
function getAnswer(query){

	console.log("DIRECTORY", __dirname)

    return new Promise(function(resolve, reject){
        var options = {
            mode: 'json',
            args: [query]
        };

        PythonShell.run('../public/py_com.py', options, function (err, results) {
            if (err) throw err;
            resolve(results)
        });
    })
}


/**
	For now we will only allow users to upload csv files. This will be used to train chatbot models.
	Users will be able to download this update from their dashboard, make changes and then re-upload
	to handle more queries
**/
function readCSV(){
	csvtojson()
	.fromFile(fileName)
	.on('json',(jsonObj)=>{
	    console.log(jsonObj)
	})
	.on('done',(error)=>{
	    console.log('end')
	})
}


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Exports
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	getAnswer,
	readCSV
}