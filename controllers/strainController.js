const Strain = require('../models/strainModel')
const mongoose = require('mongoose')

// @desc    Get strains
// @route   GET /api/strains
// @access  Public
const getStrains = async (req, res) => {
  const strains = await Strain.find()

  res.status(200).json(strains)
}

// @desc    get a single strain
// @route   GET /api/strains/id
// @access  Public
const getStrain = async (req, res) => {
  const strain = await Strain.findById(req.params.id)

  if (!strain) {
    return res.status(404).json({error: 'Strain not found!'})
  }

  res.status(200).json(strain)
}

// @desc    add new strain
// @route   POST /api/strains
// @access  Public
const addStrain = async (req, res) => {
  try {
    const strain = await Strain.create(req.body)
    res.status(200).json({strain, msg: 'Successfully added strain!'})
  } catch (error) {
    res.status(400).json({ error: 'Strain not found!' })
  }
}

// @desc    Delete a strain
// @route   DELETE /api/strains/:id
// @access  Public
const deleteStrain = async (req, res) => {
  const strain = await Strain.findByIdAndDelete(req.params.id)

  if(!strain) {
    return res.status(400).json({error: 'Strain not found!'})
  }

  res.status(200).json(strain)
}

// @desc    Update a strain
// @route   PATCH /api/strains/:id
// @access  Public
const updateStrain = async (req, res) => {
  const strain = await Strain.findByIdAndUpdate(req.params.id, req.body)

  if (!strain) {
    return res.status(400).json({error: 'Strain not found!'})
  }

  res.status(200).json(strain)
}

module.exports = {
    getStrains,
    getStrain,
    addStrain,
    deleteStrain,
    updateStrain,
}