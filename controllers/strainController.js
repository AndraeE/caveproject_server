const asyncHandler = require('express-async-handler')
const Strain = require('../models/strainModel')
const User = require('../models/userModel')
const Counter = require('../models/counterModel')

// @desc    Get all strains
// @route   GET /strains
// @access  Public
const getAllStrains = asyncHandler( async (req, res) => {
  try {
    const strains = await Strain.find()

    if(!strains?.length) {
      return res.json({ error: 'No strains found' })
    }

    // Add user's(contributor) name to each strains before sending the response 
    const strainsWithUser = await Promise.all(strains.map(async (strain) => {
      const user = await User.findById(strain.user).exec()
      return { ...strain, contributor: user.name }
    }))

    res.json(strains)

  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
})


// @desc    get a strains by user/author
// @route   GET /strains/collection
// @access  Private
const getStrainByUser = asyncHandler( async (req, res) => {
  try {
    const strains = await Strain.find({ user: req.user }).lean()

    if (!strains) {
      return res.json({ error: 'No strains found' })
    }

    res.json(strains)
    
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
})


// @desc    get a single strain
// @route   GET /api/strains/id
// @access  Private
const getStrain = asyncHandler( async (req, res) => {
  try {
    const strain = await Strain.findById(req.params.id)

    if (!strain) {
      return res.json({ error: 'Strain not found!' })
    }

    res.json(strain)
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
  
})


// @desc    create/add new strain
// @route   POST /strains
// @access  Private
const addStrain = asyncHandler( async (req, res) => {
  try {
    const data = req.body
    console.log(data)
    // for auto-increment accession_no 
    Counter.findOneAndUpdate(
      { id: 'autocounter' },
      { $inc: {counter:1} },
      { new: true }
    ).then( (counterdata, error) => {
      let accessID;
      if(counterdata == null) {
        const count = new Counter({
          id: 'autocounter',
          counter: 50001
        })
        count.save()
        accessID = 50001
      } else {
        accessID = counterdata.counter
      }

      const strain = Strain.create({
        ...data,
        user: req.user.id,
        accession_number: data.collection_name.concat('-',data.institution, '-', accessID.toString())
      })

      res.json({
        strain,
        message: 'New strain added'
      })
    })    
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
})


// @desc    Delete a strain
// @route   DELETE /strains/:id
// @access  Private
const deleteStrain = asyncHandler( async (req, res) => {
  try {
    const strain = await Strain.findByIdAndDelete(req.params.id)

    if(!strain) {
      return res.json({ error: 'Strain not found' })
    }

    res.json({
      message: 'Strain deleted'
    })
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
})


// @desc    Update a strain
// @route   PUT /strains/:id
// @access  Private
const updateStrain = asyncHandler( async (req, res) => {
  try {
    const strain = await Strain.findById(req.params.id)

    if (!strain) {
      return res.json({error: 'Strain not found!'})
    }

    const updatedStrain = await Strain.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    // const updatedStrain = await Strain.findByIdAndUpdate(req.params.id, req.body)

    res.json({
      updatedStrain,
      message: 'Strain updated'
    })
  } catch (error) {
    console.log(error)
    res.json({ error: error.message })
  }
  
})


module.exports = {
  getAllStrains,
  getStrainByUser,
  getStrain,
  addStrain,
  deleteStrain,
  updateStrain,
}
