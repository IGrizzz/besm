const programModels = require("../models/program");
const cloudinary = require('../utils/cloudinary')

class programController {

    static createNewProgram(req, res){
        if(req.file){
            cloudinary.uploader.upload(req.file.path)
            .then((result)=>{
                const {judul, desc, konten} = req.body;

                const newProgram = new programModels({
                    judul,
                    desc,
                    konten,
                    gambar: result?.secure_url,
                    cloudinary_id: result?.public_id
                })

                    newProgram
                    .save()
                        .then((program)=>{
                            res.status(201).json(program)
                        })
                            .catch((err)=>{
                                res.status(500).json(err)
                            })
            })
        }
            else {
                res.sendStatus(500).json({message:"Masukkan Gambar"})
            }
    }

    static getProgram(req, res){
        programModels.find()
        .then((results)=>{
            res.status(200).json(results)
        })
            .catch((err)=>{
                res.status(404).json(err)
            })
    }

    static getProgramById(req, res){
        programModels.findById(req.query.id)
        .then((result)=>{
            res.status(200).json(result)
        })
            .catch((err)=>{
                res.status(404).json(err)
            })
    }

    static updateBerita(req, res){
        programModels.findById(req.query.id)
        .then((program)=>{
            if(req.file){
                cloudinary.uploader.destroy()
                cloudinary.uploader.upload(req.file.path)
                .then((results)=>{
                    const { judul, desc, konten } = req.body;
                    const newProgram = {
                        judul: judul || program.judul || req.body.judul,
                        desc : desc || program.desc || req.body.desc,
                        konten : konten || program.konten || req.body.konten,
                        gambar: results?.secure_url,
                        cloudinary_id: results?.public_id
                    }

                    newProgram
                    .save()
                        .then((program)=>{
                            res.status(201).json({message: "updated", program})
                        })
                            .catch((err)=>{
                                res.status(500).json(err)
                            })
                })
            }

            const { judul, desc, konten } = req.body;
            const newProgram = {
                judul: judul || program.judul || req.body.judul,
                desc: desc || program.desc || req.body.desc,
                konten: konten || program.konten || req.body.konten
            }

            newProgram 
            .save()
                .then((program)=>{
                    res.status(201).json(program)
                })
                    .catch((err)=>{
                        res.status(500).json(err)
                    })
        })
    }

    static deleteBerita(req, res){
        programModels.findByIdAndDelete(req.query.id)
            .exec((err, program)=>{
                if(program){
                    cloudinary.upload.destroy(program.cloudinary_id)
                        .then((results)=>{
                            res.status(200).json({message:"success"})
                        })
                            .catch((err)=>{
                                res.status(500).json(err)
                            })
                }
                res.status(404).json({message:"not found"})
            })
    }
}

module.exports = programController;