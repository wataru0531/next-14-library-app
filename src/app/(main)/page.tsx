

// メインページ

import Link from "next/link";

import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";
import { MdAddTask } from "react-icons/md";


// task一覧を取得する関数
const getAllTasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(
    `${process.env.API_URL}/tasks`, 
    {
      cache: "no-store", // 一覧は頻繁に更新されるので
    }
  );

  if(response.status !== 200) throw new Error(); // 失敗

  const data = await response.json();
  // console.log(data) // { message: "...", tasks: [{}, {}, ...] }
  
  // ここで取得したdataはany型
  // → data.tasksには何が入ってくるか、TypeScriptには予測がつかないらしい。
  // よりコードを安全にするためにasでキャストしている。
  // ※ 外部のデータやライブラリから取得されるデータの型は、TypeScriptが自動的に推論することが難しい場合がある。
  return data.tasks as TaskDocument[];
}

const MainPage = async () => {
  const allTasks = await getAllTasks();
  // console.log(allTasks) // [{_id: '6644cdc16b975dd97459a872',title: 'test',description: 'test',dueDate: '2024-05-31',isCompleted: false,createdAt: '2024-05-15T14:59:13.349Z',updatedAt: '2024-05-15T14:59:13.349Z',__v: 0}]

  return (
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">

      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">All Tasks</h1>
        <Link 
          className="flex items-center gap-1 font-semibold border px-4 py-2 rounded-full shadow-sm text-white bg-gray-800 hover:bg-gray-700 duration-100"
          href="/new"
        >
          <MdAddTask className="size-5 mr-2" />
          <div>Add Task</div>
        </Link>
      </header>

      <div className="mt-8 flex flex-wrap gap-4">
        {
          allTasks.map(task => (
            <TaskCard key={ task._id } task={task} />
          ))
        }

      </div>
    </div>
  );
}

export default MainPage;