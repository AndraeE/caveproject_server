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
		isolation_source: String,	//same with location information
		sampling_site: String,
		sampling_point: String,
		sample_type: String,
		host_species: String,
		town_province: String,
		location_abbr: String,
		location_latitude: Number,
		location_longitude: Number,
		miso_categories: Array,

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