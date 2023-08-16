const asyncHandler = require('express-async-handler')

const Strain = require('../models/strainModel')
const User = require('../models/userModel')

// @desc    Get strains
// @route   GET /api/strains
// @access  Public
const getStrains = asyncHandler( async (req, res) => {
  const strains = await Strain.find()

  res.status(200).json(strains)
})

// @desc    get a strains by user/author
// @route   GET /api/strains/collection
// @access  Private
const getStrainByUser = asyncHandler( async (req, res) => {
  const strains = await Strain.find({ user: req.user.id })

  if (!strains) {
    return res.status(404).json({error: 'No strains found!'})
  }

  res.status(200).json(strains)
})


// @desc    get a single strain
// @route   GET /api/strains/id
// @access  Public
const getStrain = asyncHandler( async (req, res) => {
  const strain = await Strain.findById(req.params.id, req.body)

  if (!strain) {
    return res.status(404).json({error: 'Strain not found!'})
  }

  res.status(200).json({strain, message:`Get strain ${req.params.id}`})
})


// @desc    add new strain
// @route   POST /api/strains
// @access  Public
const addStrain = asyncHandler( async (req, res) => {
  const data = req.body

  const strain = await Strain.create({
    ...data,
    user: req.user.id
  })

  if(strain) {
    res.status(201).json({
			strain,
			message: 'Successfully added strain'
		})
	} else {
		res.status(400).json({ message: 'Strain creation failed'})
	}
})

// @desc    Delete a strain
// @route   DELETE /api/strains/:id
// @access  Public
const deleteStrain = asyncHandler( async (req, res) => {
  const strain = await Strain.findById(req.params.id)

  if(!strain) {
    return res.status(400).json({error: 'Strain not found!'})
  }

  // Checks the logged in user matches the strain user
  if (strain.user.toString() !== req.user.id) {
    res.status(401).json({ message: 'User not authorized' })
  }

  await strain.remove()

  res.status(200).json(strain)
})

// @desc    Update a strain
// @route   PUT /api/strains/:id
// @access  Public
const updateStrain = asyncHandler( async (req, res) => {
  const strain = await Strain.findById(req.params.id, req.body)

  if (!strain) {
    return res.status(400).json({error: 'Strain not found!'})
  }

  const updatedStrain = await Strain.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedStrain)
})

module.exports = {
  getStrains,
  getStrainByUser,
  getStrain,
  addStrain,
  deleteStrain,
  updateStrain,
}