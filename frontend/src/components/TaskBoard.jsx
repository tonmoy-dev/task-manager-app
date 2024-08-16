
import { useState } from "react";
import AddTaskDialog from "./AddTaskDialog";
import ProjectsList from "./ProjectsList";
import TaskList from "./TaskList";
import TeamMembers from "./TeamMembers";

export default function TaskBoard() {
    const [open, setOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState({})
    return (
        <>
            <div className="container relative py-4">
                <div className="sidebar mt-4">
                    {/* <!-- Projects List --> */}
                    <ProjectsList />

                    {/* <!-- Team Members --> */}
                    <TeamMembers />
                </div>

                <div className="lg:pl-[12rem]">
                    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                        <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
                            <button onClick={() => setOpen(true)} className="lws-addnew group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="group-hover:text-indigo-500">Add New</span>
                            </button>
                        </div>

                        <TaskList open={open} onClose={setOpen} tasks={tasks} onTasks={setTasks} updateTask={updateTask} onUpdateTask={setUpdateTask} />
                    </main>
                </div>
                <AddTaskDialog open={open} onClose={setOpen} tasks={tasks} onTasks={setTasks} updateTask={updateTask} onUpdateTask={setUpdateTask} />
            </div>
        </>
    )
}