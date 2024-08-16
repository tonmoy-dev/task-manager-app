import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import AddTaskForm from './AddTaskForm'

export default function AddTaskDialog({ open, onClose, tasks, onTasks, updateTask, onUpdateTask }) {


    return (
        <Dialog open={open} onClose={onClose} className="relative z-40">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full max-w-3xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >

                        <AddTaskForm open={open} onClose={onClose} tasks={tasks} onTasks={onTasks} updateTask={updateTask} onUpdateTask={onUpdateTask} />
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
