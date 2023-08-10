// routes/ strainRoutes

const express = require('express');
const router = express.Router();

const {
    getStrains,
    getStrain,
    addStrain,
    deleteStrain,
    updateStrain,
} = require('../controllers/strainController');

// GET all strain collection
router.get('/', getStrains)

// GET a strain
router.get('/:id', getStrain)

// POST a new strain
router.post('/', addStrain)

// DELETE a strain
router.delete('/:id', deleteStrain)

// UPDATE a strain
router.patch('/:id', updateStrain)

module.exports = router