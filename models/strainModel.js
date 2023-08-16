// models/Strain.js
const mongoose = require('mongoose');

const StrainSchema = mongoose.Schema({

	user : { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },

	// Taxonomic Details
  strain_name : String, 
  type_strain : { type : Boolean, default : false},
  scientific_name : String,
	
	domain : String,
	phylum : String,
	class_name : String,
	order : String,
	family : String,
	genus : String,
	species : String,

	// Isolation source Details
	isolation_source : String,
	host_species : String,
	cave_name : String,
	city_province : String,
	location_latitude : Number,
	location_longitude : Number,
	categories : Array,
	

	// Date Details
	date_uploaded : { type : Date, default: Date.now },
	date_updated : { type : Date, default: Date.now },

	// Other Details
	// user_id : Schema.ObjectId,
	// privacy : Boolean,
	// reference_list : String,

});

module.exports = mongoose.model('Strain', StrainSchema);