"use client";

import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const TaskManager = ({initialTasks}) => {
    const [tasksData, setTasksData] = useState(() => {
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    });
    const [toEditTask, setToEditTask] = useState(null);
    const [isFormActive, setIsFormActive] = useState({mode: null, visible: false});
    const [searchQuery, setSearchQuery] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    const cleanData = () => {
        setToEditTask(null);
        setTitle("");
        setDescription("");
        setPriority("");
    }

    // Add Task Functionality
    const handleAddTask = (e) => {
        e.preventDefault();

        if(isFormActive.mode === "edit")
        {
            setTasksData((prevTasksData) => prevTasksData.map((task) => task.id === toEditTask ? ({...task, title: title, description : description, priority: priority}) : {...task}))
        }
        else if(isFormActive.mode === "add")
        {
            let newTask = {
                id: `${tasksData.length+1}`,
                title,
                description,
                priority,
                status: "pending"
            }
    
            setTasksData((prevTasksData) => [ ...prevTasksData, newTask]);
        }

        setIsFormActive({mode: null, visible: false});
        cleanData();
    }

    // Edit Task Functionality
    const handleEditTask = (task) => {
        console.log("Edit function called");
        setToEditTask(task.id)
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setIsFormActive({mode: "edit", visible: true})
    }

    // Delete Task Functionality
    const handleDeleteTask = (taskId) => {
        setTasksData((prevTasksData) => prevTasksData.filter((task) => task.id !== taskId))
    }

    // Mark task as done Functionality
    const handleToggleTaskStatus = (taskId) => {
        setTasksData((prevTasksData) => (
            prevTasksData.map((task) => (
                task.id === taskId ? {
                    ...task,
                    status: task.status === "pending" ? "completed" : "pending"
                } : {...task}
            ))
        ))
    }


    // Sort Functionality - Sort based on high Priority and task status
    const sortTasks = (tasks) => {
        return tasks.slice().sort((task1, task2) => {
            if (task1.status === "completed" && task2.status !== "completed") {
                return 1;
            }
            if (task1.status !== "completed" && task2.status === "completed") {
                return -1;
            }
            if (task1.priority === "high" && task2.priority !== "high") {
                return -1;
            }
            if (task1.priority === "medium" && task2.priority === "low") {
                return -1;
            }
            return 0;
        });
    }

    // search functionality - seacrh tasks by title or description.
    const filteredTasks = tasksData.filter((task) => task.title.toLowerCase().includes(searchQuery.toLowerCase()) || task.description.toLowerCase().includes(searchQuery.toLowerCase()))

    const sortedTasks = sortTasks(filteredTasks);

    useEffect(() => {
        if(tasksData.length === 0)
        {
            localStorage.setItem("tasks", JSON.stringify(initialTasks));
        }
        else{
            localStorage.setItem("tasks", JSON.stringify(tasksData));
        }
    }, [tasksData]);

    return(
        <section className="TaskManagementApp">
            <header>
                <h3 className="header__heading">J/T : Task Management App</h3>
                <div className="header__actions">
                    <input
                        className="searchBar"
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                    <button className="addTask" onClick={() => setIsFormActive({mode: "add", visible: true})}>Add Task</button>
                </div>
            </header>

            <main>
                <TaskList 
                    tasksData={sortedTasks}
                    handleDeleteTask={handleDeleteTask}
                    handleToggleTaskStatus={handleToggleTaskStatus}
                    setIsFormActive={setIsFormActive}
                    handleEditTask={handleEditTask}
                />

                <TaskForm 
                    isFormActive={isFormActive} 
                    setIsFormActive={setIsFormActive}
                    title={title} 
                    setTitle={setTitle} 
                    description={description}
                    setDescription={setDescription}
                    priority={priority} 
                    setPriority={setPriority}
                    handleAddTask={handleAddTask}
                    cleanData={cleanData}
                />
            </main>
            <footer>Copyright © Preetam Bhardwaj - Josh Talks.</footer>
        </section>
    )
}

export default TaskManager;