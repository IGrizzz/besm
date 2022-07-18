const beritaModels = require('../models/berita');
const cloudinary = require('../utils/cloudinary');


class beritaController {

    static resMessage (req, res){
        res.status(200).json({
                message:"Access Succeeded"
            })
    }
    static createNewBerita(req, res){
        if(req.file){
            cloudinary.uploader.upload(req.file.path)
            .then((result)=>{
                const {judul, desc, konten} = req.body
                const newBerita = new beritaModels({
                    judul,
                    desc,
                    konten,
                    gambar: result?.secure_url,
                    cloudinary_id: result?.public_id
                });

                newBerita
                .save()
                    .then((newBerita)=>{
                        res.status(201).json(newBerita)
                    })
                        .catch((err)=>{
                            res.status(500).json(err)
                        })
            })          
        }
            else {
                res.status(500).json({message: "Wajib masukkan gambar"})
            }
    }


    static getBerita (req, res){
        beritaModels.find()
            .then((berita)=>{
                res.status(200).json(berita)
            })
                .catch((err)=>{
                    res.status(404).json(err)
                })
    }


    static getBeritaById (req, res){
        beritaModels.findById(req.query.id)
        .then((berita)=>{
            res.status(200).json(berita)
        })
            .catch((err)=>{
                res.status(404).json(err)
            })
    }


    static updateBerita (req, res){
       beritaModels.findById(req.params.id)
       .then((berita)=>{
           if(req.file){
               cloudinary.uploader.destroy(berita.cloudinary_id);
               cloudinary.uploader.upload(req.file.path)
               .then((result)=>{
                   const {judul, desc, konten} = req.body
                   const newBerita = {
                       judul: judul || req.body.judul || berita.judul,
                       desc: desc || req.body.desc || berita.desc,
                       konten: konten || req.body.konten || berita.konten,
                       gambar: result?.secure_url,
                       cloudinaryId: result?.public_id
                   }

                   newBerita
                   .save()
                       .then((berita)=>{
                           res.status(201).json(berita)
                       })
                           .catch((err)=>{
                               res.status(500).json(err)
                           })
               })
               
           }
            const {judul, desc, konten} = req.body;
            const newBerita = {
                judul: judul || req.body.judul || berita.judul,
                desc: desc || req.body.desc || berita.desc,
                konten: konten || req.body.konten || berita.konten
            }

            newBerita
                .save()
                    .then((result)=>{
                        res.status(201).json(result)
                    })
                        .catch((err)=>{
                            res.status(500).json(err)
                        })
       })
            .catch((err)=>{
                res.status(404).json(err)
            })
    }

    static deleteBerita (req, res){
        beritaModels.findByIdAndDelete(req.params.id);
        exec((err, berita)=>{
            if(berita){
                cloudinary.uploader.destroy(berita.cloudinary_id);
                res.status(200).json({message:"success"});
                return
            }
                res.status(404).json({message:err})
        })
            
    }

}


module.exports = beritaController;