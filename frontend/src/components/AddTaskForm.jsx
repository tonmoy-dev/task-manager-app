import { useState } from "react";
import axios from "axios"

const serverURL = 'http://localhost:8000';

// task_name, assign_to, project_name, deadline, status

export default function AddTaskForm({ open, onClose, tasks, onTasks, updateTask, onUpdateTask }) {
    const [formData, setFormData] = useState(
        (updateTask && Object.keys(updateTask).length > 0) ? updateTask :
            {
                task_name: '',
                assign_to: '',
                project_name: '',
                deadline: '',
                status: 'pending' // Default status
            });
    // handler
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { task_name, assign_to, project_name, deadline, id } = formData;
        if (Object.keys(updateTask).length === 0) {
            console.log('adding task');
            try {
                const res = await axios.post(`${serverURL}/tasks`, formData);
                if (res.data) {
                    onTasks([
                        ...tasks,
                        { ...res.data }
                    ])
                }
                return res.data;
            } catch (error) {
                console.error('Error on adding task: ', error);
                throw error;
            }
        } else {
            console.log('updating task');
            try {
                const res = await axios.put(`${serverURL}/tasks/${id}`, {
                    task_name, assign_to, project_name, deadline
                })
                if (res.data) {
                    const updatedTasks = tasks.map(task => task.id === id ? {
                        ...task,
                        task_name, assign_to, project_name, deadline
                    } : task);
                    onTasks([...updatedTasks])
                }
            } catch (err) {
                console.error('Error updating todo:', err);
            }
            onUpdateTask({})
        }

    }
    return (
        <div className="max-w-3xl mx-auto rounded-lg xl:max-w-none my-12">
            <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                Create Task for Your Team
            </h1>

            <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="fieldContainer">
                        <label htmlFor="lws-taskName">Task Name</label>
                        <input
                            type="text"
                            name="task_name"
                            id="lws-taskName"
                            required
                            placeholder="Write Code"
                            value={formData.task_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="fieldContainer">
                        <label htmlFor="lws-teamMember">Assign To</label>
                        <select
                            name="assign_to"
                            id="lws-teamMember"
                            required
                            value={formData.assign_to}
                            onChange={handleChange}
                        >
                            <option value="" hidden>Select Member</option>
                            <option value="James Anderson">James Anderson</option>
                            <option value="David Clark">David Clark</option>
                            <option value="Christopher Harris">Christopher Harris</option>
                            <option value="Michael Smith">Michael Smith</option>
                            <option value="Andrew Martinez">Andrew Martinez</option>
                            <option value="Matthew Roberts">Matthew Roberts</option>
                        </select>
                    </div>
                    <div className="fieldContainer">
                        <label htmlFor="lws-projectName">Project Name</label>
                        <select
                            id="lws-projectName"
                            name="project_name"
                            required
                            value={formData.project_name}
                            onChange={handleChange}
                        >
                            <option value="" hidden>Select Project</option>
                            <option value="Scoreboard">Scoreboard</option>
                            <option value="Flight Booking">Flight Booking</option>
                            <option value="Product Cart">Product Cart</option>
                            <option value="Book Store">Book Store</option>
                            <option value="Blog Application">Blog Application</option>
                            <option value="Job Finder">Job Finder</option>
                        </select>
                    </div>

                    <div className="fieldContainer">
                        <label htmlFor="lws-deadline">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            id="lws-deadline"
                            required
                            value={formData.deadline ? new Date(formData.deadline).toISOString().split("T")[0] : ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="text-right">
                        <button
                            data-autofocus
                            onClick={() => onClose(false)}
                            type="submit"
                            className="lws-submit p-2 rounded-md border-2 border-indigo-500">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}