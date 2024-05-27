

// 完了ページ

import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";

const getCompletedTasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(
    `${process.env.API_URL}/tasks/completed`, 
    {
      cache: "no-store", // 一覧は頻繁に更新されるので
    }
  );

  if(response.status !== 200) throw new Error(); // 失敗

  const data = await response.json();
  // console.log(data) // { message: "...", tasks: [{}, {}, ...] }
  
  return data.tasks as TaskDocument[];
}

const CompletedPage = async () => {
  const completedTasks = await getCompletedTasks();
  // console.log(completedTasks)

  return(
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          Completed Tasks
        </h1>
      </header>

      <div className="mt-8 flex flex-wrap gap-4">
        { 
          completedTasks.length === 0 ? (
            <p className="text-red-500">完了済みのタスクはありません</p>
          ) : (
            completedTasks.map(task => <TaskCard key={ task._id } task={ task } />)
          )
        }
      </div>
    </div>
  )
}

export default CompletedPage;

