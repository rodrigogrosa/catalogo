const {host, port, user, pass, sendGridKey} = require('../../config/json/mail.json')
const sendGrid = require('sendgrid')(sendGridKey)
const  sgMail  =  require ('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
   

// exports.send = async (to, subject, body, token) => {
//     sendGrid.send({
//         to: to,
//         from: 'rodrigo.grosa2011@gmail.com',
//         subject: subject,
//         html: body
//     });
// }

//,context: { token }

exports.send = async (to, subject, body, token) => {
    const  msg  = {
        to:'rodrigo.grosa2011@gmail.com' ,
        from:'rodrigo.grosa2011@gmail.com' ,
        subject:subject ,
        text:body ,
        html:' <strong> e fácil de fazer em qualquer lugar, mesmo com o Node.js </ strong> ' ,
      };   
     // sgMail.send(msg);

      sgMail.send(msg, function(err, json){
        if(err) { 
            return console.error(err)
        }
       // console.log(json);
    });
}

