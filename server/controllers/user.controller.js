import User from '../models/user.model'
import extend from 'lodash/extend'
import errorHandler from './../helpers/dbErrorHandler'

//Creating a new user
const create = async (req, res) => {
    const user = new User(req.body)
    try {
      await user.save()
      return res.status(200).json({
        message: "Successfully signed up!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  }

export default create