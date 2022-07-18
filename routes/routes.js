const beritaController = require('../controllers/berita');
const programController = require('../controllers/program');
const upload = require('../utils/multer');

const express = require('express');
const app = express()
const router = express.Router()


router.grt('/', ()=>{ res.json({message: "this is backend"})})

//berita

router.get('/berita', beritaController.getBerita)
router.get('/berita/id', beritaController.getBeritaById)
router.post('/berita/new', upload.single("gambar"), beritaController.createNewBerita)
router.patch('/berita/update', beritaController.updateBerita)
router.delete('/berita/delete', beritaController.deleteBerita)



//program

router.get('/program', programController.getProgram)
router.get('/program/id', programController.getProgramById)
router.post('/program/new', upload.single("gambar"), programController.createNewProgram)
router.patch('/program/update', programController.updateBerita)
router.delete('/program/delete', programController.deleteBerita)

module.exports = router