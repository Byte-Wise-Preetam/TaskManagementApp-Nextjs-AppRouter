
# Task Management App

## Description
This is a simple Task Management App built using Next.js. 
- It allows users to add, edit, delete, sort and mark tasks as completed.
- Search functionality to filter tasks by title or description.
- Persistent storage using local storage.

## Setup Instructions for Project
1. **Clone the repository:**
https://github.com/Byte-Wise-Preetam/TaskManagementApp-Nextjs-AppRouter.git

2. **Navigate to the Project Directory:**
TaskManagementApp-Nextjs-AppRouter.git 

3. **Install Dependencies:**
npm install

4. **Start the Development Server:**
npm run dev

## Approach for Sorting Tasks by Priority
Tasks are sorted based on their status and priority using a custom sorting function.
- Completed tasks are always placed at the bottom of the list.
- Within the pending tasks, those marked as high priority appear at the top, followed by medium and then low priority.

Sorting function uses the following conditions : 
- If one task is completed and the other is not, the completed task gets a higher value (1) and is placed lower in the list.
- High priority tasks are sorted before medium and low priority tasks.

