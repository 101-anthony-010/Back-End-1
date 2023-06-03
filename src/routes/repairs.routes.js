const express = require('express');

const router = express.Router();

const { 
    findRepair, 
    findRepairs, 
    createRepair,
    updateRepair,
    deleteRepair
} = require('../controllers/repairs.controller')

router
    .route('/')
    .get(findRepairs)
    .post(createRepair)
    
router
    .route('/:id')
    .get(findRepair)
    .patch(updateRepair)
    .delete(deleteRepair);

module.exports = router;