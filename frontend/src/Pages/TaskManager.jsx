import React, { useEffect, useState } from "react";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { CreateTask, deleteTasksById, GetAllTasks, updateTasksById } from "./api";
import { notify } from "../Utils";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './TaskManager.css'; // Custom CSS file

function TaskManager() {
    const [input, setInput] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [tasks, setTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = async () => {
        if (updateTask && input && description && dueDate) {
            handleUpdateTask();
        } else if (updateTask === null && input && description && dueDate) {
            handleAddTask();
        }
    };

    useEffect(() => {
        if (updateTask) {
            setInput(updateTask.title);
            setDescription(updateTask.description);
            setDueDate(updateTask.dueDate);
        }
    }, [updateTask]);

    const handleAddTask = async () => {
        const obj = {
            title: input,
            description: description,
            dueDate: dueDate,
            completed: false
        };
        try {
            const data = await CreateTask(obj);
            toast.success("Task created successfully!");
            fetchAllTasks(); // Refresh the task list
            setInput("");
            setDescription("");
            setDueDate("");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create task.");
        }
    };

    const handleUpdateTask = async () => {
        const obj = {
            title: input,
            description: description,
            dueDate: dueDate,
            completed: updateTask.completed
        };
        try {
            const { success, message } = await updateTasksById(updateTask._id, obj);
            if (success) {
                toast.success("Task updated successfully!");
                fetchAllTasks(); // Refresh the task list
                setUpdateTask(null);
                setInput("");
                setDescription("");
                setDueDate("");
            } else {
                toast.error("Failed to update task.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task.");
        }
    };

    const fetchAllTasks = async () => {
        try {
            const { data } = await GetAllTasks();
            setTasks(data);
        } catch (err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        try {
            const { success, message } = await deleteTasksById(id);
            if (success) {
                toast.success("Task deleted successfully!");
                fetchAllTasks(); // Refresh the task list
            } else {
                toast.error("Failed to delete task.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete task.");
        }
    };

    const handleCheckAndUnCheck = async (item) => {
        const { _id, completed, title } = item;
        const obj = {
            completed: !completed,
            title
        };
        try {
            const { success, message } = await updateTasksById(_id, obj);
            if (success) {
                toast.success("Task updated successfully!");
                fetchAllTasks(); // Refresh the task list
            } else {
                toast.error("Failed to update task.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update task.");
        }
    };

    const handleUpdate = (item) => {
        setUpdateTask(item);
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Task Manager</h1>

            <div className="card p-4 mb-4">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="form-control"
                        placeholder="Enter task name"
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-control"
                        placeholder="Enter task description"
                    />
                </div>
                <div className="input-group mb-3">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="form-control"
                        placeholder="Enter task due date"
                    />
                </div>
                <button className="btn btn-success w-100" onClick={handleTask} type="button">
                    {updateTask ? "Update Task" : "Add Task"}
                </button>
            </div>

            <h2 className="mb-4 text-center">Task List</h2>
            <div className="task-list">
                {tasks.map((item) => (
                    <div key={item._id} className="task-item card mb-3 p-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className={item.completed ? "text-decoration-line-through" : ""}>
                                    {item.title}
                                </h5>
                                <p className="mb-1">{item.description}</p>
                                <small className="text-muted">Due: {new Date(item.dueDate).toLocaleDateString()}</small>
                            </div>
                            <div className="btn-group">
                                <button className="btn btn-success me-2" onClick={() => handleCheckAndUnCheck(item)} type="button"><FaCheck /></button>
                                <button className="btn btn-primary me-2" onClick={() => handleUpdate(item)} type="button"><FaPencilAlt /></button>
                                <button className="btn btn-danger" onClick={() => handleDeleteTask(item._id)} type="button"><FaTrash /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
            />
        </div>
    );
}

export default TaskManager;