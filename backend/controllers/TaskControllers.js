const TaskModel = require("../Models/TaskModel");


const createTask = async (req, res) => {
   const data = req.body;
   try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task created successfully', success:true });
   } catch (error) {
        res.status(400).json({ message: 'Failed to create task', success:false });
        console.log(error);
   }
};

const fetchAllTask = async (req, res) => {
   try {
        const data = await TaskModel.find({});
        res.status(201).json({ message: 'All tasks', success:true,data });
        } catch (error) {
            res.status(500).json({ message: 'Failed to create task', success:false });
            console.log(error);
    }
};

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = {$set: {...body}};
         await TaskModel.findByIdAndUpdate(id, obj);
        res.status(200).json({ message: 'Task updated successfully', success:true });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', success:false });
        console.log(error);
    }
 };

 const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await TaskModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully', success:true,data });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', success:false });
    }
 };
 
module.exports = { createTask , fetchAllTask , updateTaskById , deleteTaskById };