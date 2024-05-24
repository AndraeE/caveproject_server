// models/Strain.js
const mongoose = require('mongoose');

const StrainSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
		hide: { type: Boolean, default: false },
		status: String,

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
		type_description: String,
		type_description_code: String,
		sample_type: String,
		sample_type_code: String,	// backend generate
		host_type: String,
		host_species: String,
		sampling_site: String,		//cave name
		sampling_point: String,		//cave site code
		// sampling_date: Date,
		municity: String,					// municipality/city
		province: String,
		// city_province: String,
		location_abbr: String,		// backend generate
		location_latitude: Number,
		location_longitude: Number,
		miso_categories: Array,
		storage_information: String,
		location_information: String,

		// Strain Identifier
		isolate_id: String,					// isolation_code (change)
		database_id: Number,					// auto-increment
		accession_number: String,			// database_id in String (concat MCC-MNH)
		full_accession_code: String,	// backend generate
		collection_name: String,
		institution: String,
		project_name: String,
		project_code: String,
		custom_code: String,
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Strain', StrainSchema);

/*
	full_accession_code : collection-institution-project_code-location_abbr-sampling_site-sampling_point-type_desc[code]-host_type-sampling_type-isolate_id

	jusko awa na lang
*/
