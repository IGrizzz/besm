const userModels = require('../models/user')

class userController {

    static createNewUser (req, res){
        const {email, username, password} = req.body;

        userModels.findOne({email:email})
            .then((oldUser)=>{
                if(oldUser){
                    res.status(500).json({message:"Email telah digunakan"})
                }

                bcrypt
                .hash(password, 12)
                    .then((hashedPass)=>{
                        const newUser = {
                            email,
                            username,
                            password: hashedPass
                        }

                        newUser
                            .save()
                                .then((newUser)=>{
                                    res.status(201).json(newUser)
                                })
                                    .catch((err)=>{
                                        res.status(500).json(err)
                                    })
                    })
                        .catch((err)=>{
                            res.status(500).json(err)
                        })
            })
                .catch((err)=>{
                    res.status(500).json(err)
                })


    }


    static getUser (req, res){
        userModels.find()
            .then((results)=>{
                res.status(200).json(results)
            })
                .catch((err)=>{
                    res.status(404).json(err)
                })
    }


    static getUserById (req, res){
        userModels.findById(req.query.id)
        .then((results)=>{
            res.status(200).json(results)
        })
            .catch((err)=>[
                res.status(404).json(err)
            ])

    }


    static updateUser (req, res){
        userModels.findById(req.query.id)
        .then((user)=>{
            const {email, username, password} = req.body;

            bcrypt
                .hash(password, 12)
                    .then((hashedPass)=>{
                        const newUser = {
                            email: email || req.body.email,
                            username: username || req.body.username,
                            password: hashedPass
                        }

                        newUser
                            .save()
                                .then((newUser)=>{
                                    res.status(201).json({message:"updated", newUser})
                                })
                                    .catch((err)=>{
                                        res.status(500).json(err)
                                    })
                    })
                        .catch((err)=>{
                            res.status(500).json(err)
                        })
        })
    }

    static deleteUser (req, res){
        userModels.findByIdAndDelete(req.query.id)
        .exec((err, user)=>{
            if(!user){
                res.status(201).json({message:"item dihapus"})
            }
                res.status(500).json(err)
        })
    }
}