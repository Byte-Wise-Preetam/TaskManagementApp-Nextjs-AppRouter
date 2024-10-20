const Task = ({task, handleDeleteTask, handleToggleTaskStatus, handleEditTask}) => {

    return(
        <div className="task" key={task.id}>
            <div className="task__info">
                <h4 className="name">{task.title}</h4>
                <p className="description">{task.description}</p>
            </div>
            <div className="task__actions">
                <div className="task__actions__text">
                    <p className="status">{task.status === "pending" ? "Pending" : "Completed"}</p>
                    <div className={`priority ${task.priority}`}></div>
                </div>
                <div className="task__actions__buttons">
                    <button onClick={() => handleToggleTaskStatus(task.id)} className="done">{task.status === "pending" ? "Mark as Done" : "Undo"}</button>
                    <button className="edit" onClick={() => handleEditTask(task)}>Edit</button>
                    <button onClick={() => handleDeleteTask(task.id)} className="delete">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Task;