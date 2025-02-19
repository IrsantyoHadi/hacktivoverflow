const { userModel } = require('../models')
const { compare } = require('../helpers/bcrypt')
const { sign, decodeId } = require('../helpers/jwtoken')

class UserController {
  static signup(req, res, next) {
    let { username, email, password } = req.body
    let newUser = { username, email, password }
    userModel
      .create(newUser)
      .then((newUser) => {
        let payload = {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email
        }
        let token = sign(payload)
        res.status(200).json({ token , userId : newUser._id})
      })
      .catch(next)
  }

  static signin(req, res, next) {
    let { username, password } = req.body
    userModel
      .findOne({
        username: username
      })
      .then((found) => {
        if (found) {
          if (compare(password, found.password)) {
            let payload = {
              _id: found._id,
              username: found.username,
              email: found.email
            }
            let token = sign(payload)
            res.status(200).json({ token, userId : found._id })
          }
          else {
            throw `Invalid username / password`
          }
        }
        else {
          throw `Invalid username / password`
        }
      })
      .catch(next)
  }

  static update(req, res, next) {
    userModel.update({ _id: req.decoded._id }, req.body)
      .then(function (data) {
        res.status(200).json({
          data,
          msg: 'berhasil update'
        })
      })
      .catch(next)
  }

  static find(req, res, next) {
    userModel.find()
      .then(data =>{
        res.status(200).json({data})
      })
      .catch(next)
  }
}

module.exports = UserController