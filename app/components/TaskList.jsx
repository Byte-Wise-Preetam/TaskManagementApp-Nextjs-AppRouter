import Task from "./Task";

const TaskList = ({tasksData, handleDeleteTask, handleToggleTaskStatus, handleEditTask}) => {
    return(
        <div className="tasksWrapper">
            {
                tasksData && tasksData.map((task) => (
                    <Task 
                        task={task} 
                        key={task.id}
                        handleDeleteTask={handleDeleteTask}
                        handleToggleTaskStatus={handleToggleTaskStatus}
                        handleEditTask={handleEditTask}
                    />
                ))
            }
            
        </div>
    )
}

export default TaskList;