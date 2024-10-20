// app/components/TaskForm.tsx
"use client";

export default function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  isFormActive,
  setIsFormActive,
  handleAddTask,
  cleanData
}) {
  return (
    isFormActive.visible && (
      <div className="formWrapper">
        <form className="taskForm" onSubmit={handleAddTask}>
          <div className="taskForm__cancel">
            <button onClick={() => {
                setIsFormActive({mode: null, visible: false});
                cleanData();
            }}>
                Cancel
            </button>
          </div>
          <input
          className="taskForm__input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
          <input
            className="taskForm__input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
          <select
            className="taskForm__select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" disabled>Select priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="taskForm__submit" type="submit">{isFormActive.mode === "edit" ? "Save Changes" : isFormActive.mode === "add" && "Add Task"}</button>
        </form>
      </div>
    )
  );
}
