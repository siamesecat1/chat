var mailgun = require("mailgun-js");
var api_key = 'YOUR_API_KEY';
var DOMAIN = 'YOUR_DOMAIN_NAME';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Functions 
////////////////////////////////////////////////////////////////////////////////////////////////

function sendEmail(email){

    var data = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: email,
        subject: '',
        text: 'Testing some Mailgun awesomness!'
    };
      
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });

}


////////////////////////////////////////////////////////////////////////////////////////////////
                                    // Exports 
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
	sendEmail
}