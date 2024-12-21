import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const formatDate = (date) => {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const day = new Date(date).getDate()
  return `${day}-${month + 1}-${year}`
}

export const joinKeywords = (arr) => {
  return arr.join(', ')
}

export const articleFileName = (articleObject) =>
  `msr-vol-${articleObject.volume}(${articleObject.issue})-pg${articleObject.startPage}-${articleObject.endPage}.pdf`

export const hashPassword = async (password) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}

export const validatePassword = async (password, hashedPassword) => {
  const isValid = await bcrypt.compare(password, hashedPassword)
  return isValid
}

export const signJWT = (payload, option = { expiresIn: '1d' }) => {
  const secretKey = process.env.JWT_SECRET_KEY
  const signedToken = jwt.sign(payload, secretKey, option)
  return signedToken
}

export const verifyJWT = (token) => {
  try {
    const secretKey = process.env.JWT_SECRET_KEY
    const verifiedToken = jwt.verify(token, secretKey)
    return { ...verifiedToken, expired: false }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { expired: true }
    }
    throw error
  }
}

export const handleServerSideValidationError = (parsedData) => {
  const validationError = Object.fromEntries(
    parsedData.error?.issues?.map((issue) => [issue.path[0], issue.message]) ||
      []
  )
  return validationError
}

export const handleValidationErrorFromServer = (
  response,
  formFields,
  setError
) => {
  const fieldWithError = Object.keys(formFields).find(
    (field) => response?.error[field]
  )
  if (fieldWithError) {
    // Use the ValidFieldNames type to ensure the correct field names
    const errors = Object.keys(response.error)
    errors.forEach((error) =>
      setError(error, { type: 'server', message: response.error[error] })
    )
  }
}

export const replaceSpaceInTitleWithHyphen = (string) => {
  const titleWithoutColon = string.replace(/[:,]/g, '')
  const titleWithHyphen = titleWithoutColon.replace(/ /g, '-')
  return titleWithHyphen.toLowerCase()
}

export const dateHelperFunction = (date, variant = 'short') => {
  if (variant === 'short') {
    return new Date(date).toLocaleDateString()
  }
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const authorsNameWithAbrreviations = (name) => {
  const splitName = name.split(' ')
  const arrayWithNameInitials = splitName.map((name, index) =>
    index === 0 ? `${name} ` : `${name[0]?.toUpperCase()}.`
  )
  return arrayWithNameInitials.join('')
}
