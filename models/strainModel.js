// models/Strain.js

const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const StrainSchema = new mongoose.Schema({
  strain_name : String, 
  type_strain : { type : Boolean, default : false},
  scientific_name : String,
  // medium : String,
  // medium_growth : Boolean,
  // medium_composition : String,
	// temperature : Number,
	// temperature_type : String,
	// temperature_range : String,
	
	// Taxonomic Details
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

module.exports = Strain = mongoose.model('strain', StrainSchema);