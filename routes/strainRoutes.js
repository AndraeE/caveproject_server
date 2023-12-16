// routes/ strainRoutes
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')

const {
    getAllStrains,
    getStrainByUser,
    getStrain,
    addStrain,
    deleteStrain,
    updateStrain,
} = require('../controllers/strainController');

// GET all strains
router.get('/', auth, getAllStrains)

// GET strains by user
router.get('/collection', auth, getStrainByUser)

// GET a strain
router.get('/:id', auth, getStrain)

// POST a new strain
router.post('/', auth, addStrain)

// DELETE a strain
router.delete('/:id', auth, deleteStrain)

// UPDATE a strain
router.put('/:id', auth, updateStrain)

module.exports = router