import TaskManager from "./components/TaskManager";
import { fetchTasks } from "./utils/fetchTasks";

export default async function Home() {
  const initialTasks = await fetchTasks();

  return (
    <TaskManager initialTasks={initialTasks}/>
  );
}
