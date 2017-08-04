const mongoose = require('mongoose');
const Client = require('./Client');
const DetailsDevis = require('./DetailsDevis');

let validMontantHtChecker = (montantHt) => {
	if (!montantHt) {
		return false;
	} else if (isNaN(montantHt)) {
		return false;
	}
	return true;
};

const montantHtValidators = [{
	validator: validMontantHtChecker,
	message: 'Invalid montantHT'
}];

const DevisSchema = new mongoose.Schema({
	ref_devis: {
		type: String,
		required: true,
		unique: true
	},
	date_creation: {
		type: Date,
		default: Date.now,
		required: true
	},
	montantHt: {
		type: Number,
		required: true,
		validate: montantHtValidators
	},
	tauxTva: {
		type: Number,
		required: true
	},
	montantTtc: {
		type: Number
	},
	client: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client',
		required: true
	},
});

DevisSchema.pre('save', function(next) {
	// Calcul MontantTTC
	let montantTTC = this.montantHt + this.tauxTva;
	montantTTC = montantTTC.toFixed(2);
	this.montantTtc = montantTTC;
	
	next();
});  

module.exports = mongoose.model('Devis', DevisSchema);
