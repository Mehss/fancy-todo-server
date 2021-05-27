const { User, Todo } = require('../models/index')
const {jwtEncrypt, jwtDecrypt} = require('../helpers/jwt')
const user = require('../models/user')
const {compareHash} = require('../helpers/brcypt')

class Controller{
    static postRegister(req, res){
        if (!req.body.email || !req.body.password) throw "Please fill email and password"
        User.create(req.body)
            .then(() => {
                res.status(200).json(req.body)
            })
            .catch((err) => {
                console.log(err)
                res.status(400).json(err)
            })
    }

    static postLogin(req, res){
        if (!req.body.email || !req.body.password) throw "Please fill email and password"
        User.findOne({where:{email: req.body.email.toLowerCase()}})
            .then(user => {
                if(compareHash(req.body.password, user.password)){
                    const token = jwtEncrypt({id: user.id, email: user.email})
                    res.status(200).json(token)
                }
                else res.status(400).json("salah password")
            })
            .catch((err) =>{
                console.log(err)
                res.status(400).json(err)
            })
    }
}

module.exports = Controller