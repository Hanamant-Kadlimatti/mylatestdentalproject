//database
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientlSchema = new Schema({
     _id: { type: String, default: Date.now},
    created: {
        type: Date,
        default: Date.now
    },
     contact: {
        type: String,
        default: '',
        trim: true
    },
     emailId: {
        type: String,
        default: '',
        trim: true
    },
      patientAge: {
        type: String,
        default: '',
        trim: true
    },
     patientChiefComplaint: {
        type: String,
        trim: true
    },
      patientGender: {
        type: String
    },
    patientName: {
        type: String,
        default: '',
        trim: true
    },
    patientPlace: {
        type: String,
        default: '',
        trim: true
    },
    patientSelectedMedicalCondition: {
        type: String
    },
     treatment: {
         type: String,
        default: '',
        trim: true
    },
     startTime: {
            type: Date
        },
    endTime: {
            type: Date
        },
     dentist: {
        type: String,
        default: '',
        trim: true
    },
     dentist_id: {
        type: String,
        default: '',
        trim: true
    },
     hospitalName: {
        type: String,
        default: '',
        trim: true
    },
});

mongoose.model('Patientl', PatientlSchema);
