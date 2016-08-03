'use strict';

var _ = require('underscore');
var gcal = require('google-calendar');
var User = require('mongoose').model('User');
var path = require('path');
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

  // Load the twilio module
         var twilio = require('twilio');
 
        // Create a new REST API client to make authenticated requests against the
        // twilio back end
          var client = new twilio.RestClient('AC1a0432d220e8240cae1acf4b39ff04b4', '28ad85cfa30f29acb55e21fd179db977');

   
        
        var sendSms = function(){

       

        // Pass in parameters to the REST API using an object literal notation. The
         // REST client will handle authentication and response serialzation for you.
         client.sms.messages.create({
              // to:'+919663398669',
               to:'+918792955198',   // This is my original number
               from:'+17865286119', //I got this number from twilio
                body:' Your Appointment is Confirmed  Thank You'
           }, function(error, message) {
          // The HTTP request to Twilio will run asynchronously. This callback
          // function will be called when a response is received from Twilio
          // The "error" variable will contain error information, if any.
          // If the request was successful, this value will be "falsy"
           if (!error) {
               // The second argument to the callback will contain the information
               // sent back by Twilio for the request. In this case, it is the
               // information about the text messsage you just sent:
                  console.log('Success! The SID for this SMS message is:');
                   console.log(message.sid);
 
                  console.log('Message sent on:');
                   console.log(message.dateCreated);
               } else {
                 console.log('Oops! There was an error.');
             }
           });
         }
        
        


var userProfile=null;

exports.login = function(req, res, next) {
    if(!req.session.accessToken) {
        res.send(401, 'Not logged in.');
    } else {
        next();
    }
};

exports.list = function (req, res, next) {
  
  
  User.findOne({ username: 'bhuvansalanke' }, function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Failed to load User '));
        }

        userProfile = user;
        
    var accessToken = req.session.accessToken;
    var calendarId = req.user._doc.email;
    var calendar = new gcal.GoogleCalendar(accessToken);
    
    calendar.events.list(calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList) {
        
        if (err) {
            return res.status(400).send({
                message: err
        });
        } else {
            
            var filtered = _.where(eventList.items, {summary: 'Bhuvan D'});
            console.log(filtered);
            
            res.send(JSON.stringify(eventList, null, '\t'));
        }
        
    });
    
    });
    
    
};


exports.create = function (req, res, next) {
    //map request body to google calendar data structure
    
    var profile = userProfile._doc;
    
    var addEventBody = {
        'status':'confirmed',
        'summary': req.body.contact.fName + ' ' + req.body.contact.lName,
        'description': req.body.patient.patientName + '\n' + req.body.patient.emailId + '\n' + req.body.patient.contact,
        'organizer': {
          'email': profile.email,
          'self': true
        },
        'reminders':{
          'useDefault': false,
          'overrides': [
              {
                  'method': 'email',
                  'minutes': '1440'
              },
              {
                  'method': 'popup',
                  'minutes': '1140'
              }
          ]  
        },
        'start': {
          'dateTime': req.body.startdate,
        },
        'end': {
          'dateTime': req.body.enddate
        },
        'attendees': [
            {
              'email': req.body.contact.emailId,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
              {
              'email': req.body.contact.adminemailId,
              'organizer': true,
              'self': true,
              'responseStatus': 'needsAction'
            },
            {
              'email': req.body.patient.emailId,
              'organizer': false,
              'responseStatus': 'needsAction'
            },
            
            
        ]
    };  
   
    var calendar = new gcal.GoogleCalendar(profile.providerData.accessToken);
    
    calendar.events.insert(profile.email, addEventBody, function(err, response) {
        
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.send(response);
            sendSms();
        }
        
    });

};

exports.load = function (req, res, next) { 
  User.findOne({
    username: 'hanamantrkadlimatti'
  }, function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User '));
    }

    userProfile = user;

  });
};

