'use strict';

var _ = require('underscore');
var gcal = require('google-calendar');
var User = require('mongoose').model('User');
var path = require('path');
var q = require('q');
var oauth = require('oauth');
var config = require(path.resolve('./config/config'));
var errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

// Load the twilio module
var twilio = require('twilio');

// Create a new REST API client to make authenticated requests against the twilio back end
var client = new twilio.RestClient('AC1a0432d220e8240cae1acf4b39ff04b4', '28ad85cfa30f29acb55e21fd179db977');

function sendSms(contactNumber) {

    // Pass in parameters to the REST API using an object literal notation. The
    // REST client will handle authentication and response serialzation for you.
    client.sms.messages.create({
        to: '+91' + contactNumber,   // This is my original number
        from: '+17865286119', //I got this number from twilio
        body: ' Your Appointment is Confirmed  Thank You'
    }, function (error, message) {
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

function authorize(refreshToken) {
    var deferred = q.defer();

    var oa = new oauth.OAuth2(config.google.clientID,
        config.google.clientSecret,
        'https://accounts.google.com/o',
        '/oauth2/auth',
        '/oauth2/token');

    if (refreshToken) {
        oa.getOAuthAccessToken(refreshToken, { grant_type: 'refresh_token', client_id: config.google.clientID, client_secret: config.google.clientSecret },
            function (err, access_token, refresh_token, res) {

                //lookup settings from database
                User.findOne({ username: 'hanamantrkadlimatti' }, function (findError, settings) {

                    var expiresIn = parseInt(res.expires_in);
                    var accessTokenExpiration = new Date().getTime() + (expiresIn * 1000);

                    //add refresh token if it is returned
                    if (refresh_token !== undefined) settings.providerData.refreshToken = refresh_token;

                    //update access token in database
                    settings.providerData.accessToken = access_token;
                    settings.google_access_token_expiration = accessTokenExpiration;

                    settings.save();

                    deferred.resolve(settings);
                });
            });

    }
    else {
        deferred.reject({ error: 'Application needs authorization.' });
    }

    return deferred.promise;
}

function getAccessToken() {
    var deferred = q.defer();
    var accessToken;


    User.findOne({ username: 'hanamantrkadlimatti' }, function (findError, settings) {
        //check if access token is still valid
        var today = new Date();
        var currentTime = today.getTime();

        if (settings) {
            if (currentTime < settings.google_access_token_expiration) {
                deferred.resolve(settings);
            }
            else {
                //refresh the access token
                authorize(settings.providerData.refreshToken).then(function (settings) {

                    deferred.resolve(settings);

                }, function (error) {

                    deferred.reject(error);

                });
            }
        }

    });

    return deferred.promise;
}

exports.login = function (req, res, next) {
    if (!req.session.accessToken) {
        res.send(401, 'Not logged in.');
    } else {
        next();
    }
};

exports.list = function (req, res, next) {

    getAccessToken().then(function (user) {

        var accessToken = user.providerData.accessToken;
        var calendarId = user.email;
        var calendar = new gcal.GoogleCalendar(accessToken);

        calendar.events.list(calendarId, { 'timeMin': new Date().toISOString() }, function (err, eventList) {

            if (err) {
                return res.status(400).send({
                    message: err
                });
            } else {

                var filtered = _.where(eventList.items, { summary: 'Bhuvan D' });
                console.log(filtered);

                res.send(JSON.stringify(eventList, null, '\t'));
            }

        });

    });


};

exports.create = function (req, res, next) {
    //map request body to google calendar data structure

    getAccessToken().then(function (user) {


        var profile = user._doc;

        var addEventBody = {
            'status': 'confirmed',
            'summary': req.body.contact.fName + ' ' + req.body.contact.lName,
            'description': req.body.patient.patientName + '\n' + req.body.patient.emailId + '\n' + req.body.patient.contact,
            'organizer': {
                'email': profile.email,
                'self': true
            },
            'reminders': {
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

        calendar.events.insert(profile.email, addEventBody, function (err, response) {

            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.send(response);
                sendSms(req.body.patient.contact);
            }

        });
    });


};



