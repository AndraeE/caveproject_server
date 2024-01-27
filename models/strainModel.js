// models/Strain.js
const mongoose = require('mongoose')


const StrainSchema = mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
		hide: { type: Boolean, default: false },

		// Taxonomic Details
		strain_name: String, 
		scientific_name: String,
		domain: String,
		phylum: String,
		class_name: String,
		order: String,
		family: String,
		genus: String,
		species: String,

		// Isolation source Details
		sampling_site: String,		//cave name
		sampling_point: String,		//cave site code
		host_type: String,
		host_species: String,
		sample_type: String,
		isolate_id: String,
		city_province: String,
		location_abbr: String,
		location_latitude: Number,
		location_longitude: Number,
		miso_categories: Array,
		location_information: String,

		// Strain Identifier
		// accession_number: String,
		// id_source: String,
		// id_isolate: String,
		// custom_id: String,
		// collection: String,
		// institution: String,
		// database_id: String,
		// project_name: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Strain', StrainSchema);