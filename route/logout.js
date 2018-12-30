
const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    req.session.destroy(function(){
        res.redirect('/');
    });
})
router.post('/',(req,res)=>{
    req.session.destroy(function(){
        res.redirect('/');
    });
})

module.exports = router;