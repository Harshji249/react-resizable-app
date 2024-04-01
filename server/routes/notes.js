const express = require('express')
const {body} = require('express-validator')
const {
    addnote,
    updatenote,
    getnote,
    getcount
} = require('../controllers/NotesController')

const router = express.Router();
router.post('/addnote', [
    body('title','Title should be atlest 3 characters').isLength({min:3}),
    body('desc','Description should be atlest 5 characters').isLength({min:5})
],addnote)

router.put('/updatenote/:id', updatenote)

router.get('/getnote', getnote)

module.exports = router;