const jwt = require('jsonwebtoken')

// JWT Generation
const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
    expiresIn: '1d',
  })
  
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

	return token
}

const fullAccessionCodeGenerator = (data) => {
  const arrayData = [
    data.collection_name,
    data.institution,
    data.project_code.
    data.location_abbr,
    data.sampling_site,
    data.sampling_point,
    data.type_description_code,
    data.host_type,
    data.sampling_type,
    data.isolate_id
  ]

  return arrayData.filter( item => item != '').join('-')
}

module.exports = {
	generateToken,
  fullAccessionCodeGenerator
}