const mongoose = require('mongoose');
const FactureMois = require('./FactureMois');

const ReglementSchema = mongoose.Schema({
    date_reglement: {
        type: Date,
        default: Date.now,
        required: true
    },
    reglementTtc: {
        type: Number,
        required: true
    },
    factureMois: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FactureMois',
        required: true
    },
});

module.exports = mongoose.model('Reglement', ReglementSchema);
