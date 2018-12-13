// Envie um e-mail de confirmação para entrar em contato com o link para confirmar o e-mail


exports.sendConfirmation = (req, res, next) => {
	var request = sg.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: prepareEmail(req.body)
	});

	sg.API(request, function(error, response) {
		if (error) {
			console.log('Error response received');
		}
		console.log(response.statusCode);
		console.log(response.body);
		console.log(response.headers);

		if (response.statusCode >= 200 && response.statusCode < 300) {
			res.sendFile(path.join(__dirname, '../static/check-inbox.html'));
		} else {
			res.sendFile(path.join(__dirname, '../static/error.html'));
		}
	});
}

function prepareEmail(reqBody) {
    const subject = "Please Confirm Your Email Address";
    const url = formatUrl(Settings.url) + '/success';
    const link = "<a href='" + url + "'>this link</a>"
    const mailText = "Thanks for signing up! Click " + link + " to sign up!  This link will be active for 24 hours.";
  
    var emailBody = {
     personalizations: [
       {
         to: [
           {
             email: reqBody.email,
           }
         ],
         subject: subject,
         custom_args: {
          type: optIn,
          time_sent: String(Date.now()),
         },
         substitutions: {
          link_insert: link
         }
       },
     ],
     from: {
       email: Settings.senderEmail,
       name: Settings.senderEmail,
     },
     content: [
       {
         type: "text/html",
         value: mailText,
       }
     ],
    }
  
    const templateId = Settings.templateId;
    if (templateId) emailBody.template_id = templateId;
  
    for (key in reqBody) {
      emailBody.personalizations[0].custom_args[key] = reqBody[key];
    }
  
    return emailBody;
  }

  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