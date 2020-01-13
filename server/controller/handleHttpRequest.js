const router = require('express').Router()
const query = require('../model/query')

router.get('/', async (req, res, next)=> {
    let total = await query.getNumOfAllData()
    let listOfTypes = await query.getAllTypes()
    // console.log(total, listOfTypes)
    res.send({total, listOfTypes})
})
router.post('/', async (req, res, next) => {
    const numOfThisType = await query.getNumByType(req.body.targetType)
    res.send({numOfThisType})
})
module.exports=router