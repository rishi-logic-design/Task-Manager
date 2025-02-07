const { createTask, fetchAllTask, updateTaskById, deleteTaskById, } = require('../Controllers/TaskControllers');

const router = require('express').Router();

router.get('/', fetchAllTask);

router.post('/',createTask);

router.put('/:id',updateTaskById);

router.delete('/:id',deleteTaskById);


module.exports = router;