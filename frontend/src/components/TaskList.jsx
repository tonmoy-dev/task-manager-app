import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../utils/formatDate";

const serverURL = 'http://localhost:8000';

export default function TaskList({ tasks, onTasks, open, onClose, updateTask, onUpdateTask }) {

  useEffect(() => {
    fetchTasks();
  }, []);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${serverURL}/tasks`);
      if (res.data) {
        onTasks(res.data)
      }
      return res.data;
    } catch (error) {
      console.error('Error on fetching tasks: ', error);
      throw error;
    }
  }

  // delete task handler
  const deleteTaskHandler = async (id) => {
    try {
      const res = axios.delete(`${serverURL}/tasks/${id}`);
      const filteredTasks = tasks.filter(task => task.id !== id);
      onTasks([...filteredTasks])

    } catch (error) {
      console.error('Error on deleting task: ', error);
      throw error;
    }
  }

  // update task handler (update task status)
  const handleStatusChange = async (event, id) => {
    // console.log(event.target.value, id);
    const status = event.target.value;
    try {
      const res = await axios.put(`${serverURL}/tasks/${id}/status`, {
        status
      })
      if (res.data) {
        const updatedTasks = tasks.map(task => task.id === id ? { ...task, status: status } : task);
        onTasks([...updatedTasks])
      }
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  }

  return (
    <div className="lws-task-list">
      {
        tasks.map(task => (
          <div key={task.id} className="lws-task">
            <div className="flex items-center gap-2 text-slate">
              <h3 className="text-xl">{formatDate(task.deadline)}</h3>
            </div>

            <div className="lws-taskContainer">
              <h1 className="lws-task-title">{task.task_name}</h1>
              <span className="lws-task-badge border border-green-600 text-green-600 p-1">{task.project_name}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img src={`./images/avatars/${task.assign_to}.jpg`} className="team-avater" />
                <p className="lws-task-assignedOn">{task.assign_to}</p>
              </div>
              {
                //  < !-- delete button will not shown to the ui, until the status of the task will be completed -->
                task.status === "completed" && (
                  <button onClick={() => deleteTaskHandler(task.id)} className="lws-delete">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-600 hover:text-red-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                )
              }
              <button onClick={() => {
                onClose(true)
                onUpdateTask(task)
              }} className="lws-edit">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-6 h-6 text-gray-600 hover:text-indigo-600">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
              </button>
              <select className="lws-status" value={task && task.status ? task.status : "pending"} onChange={(event) => handleStatusChange(event, task.id)}>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        ))
      }

    </div>
  )
}