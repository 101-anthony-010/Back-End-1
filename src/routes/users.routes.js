const express = require('express');

const router = express.Router();

const {
    findUsers,
    createUser,
    updateUser,
    deleteUser,
    findUser
} = require('../controllers/users.controller')

router
    .route('/')
    .get(findUsers)
    .post(createUser)

router
    .route('/:id')
    .get(findUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = router;