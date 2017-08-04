const mongoose = require('mongoose');
const Devis = require('./Devis');

const DetailsDevisSchema = mongoose.Schema({
    montantHt: {
        type: Number,
        required: true
    },
    tauxTva: {
        type: Number,
        required: true
    },
    montantTtc: {
        type: Number,
        required: true
    },
    devis: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Devis',
        required: true
    },
});

DetailsDevisSchema.pre('save', function(next) {
    next();
});

module.exports = mongoose.model('DetailsDevis', DetailsDevisSchema);
