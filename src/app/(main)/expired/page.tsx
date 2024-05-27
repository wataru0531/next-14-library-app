
// 期限切れページ

import TaskCard from "@/components/TaskCard/TaskCard";
import { TaskDocument } from "@/models/task";


// 期限切れのタスクを取得 (現在の日付より前の日付のタスク)
const getExpiredTasks = async () => {

  const response = await fetch(`${process.env.API_URL}/tasks/expired`, {
    cache: "no-store",
  });
  // console.log(response); // _Response [Response] {...}
  // → レスポンスオブジェクト。fetchで取得した詳細が記述されている
  //   fetchは、HTTPリクエストを行い、その応答としてPromiseオブジェクトを返す
  //   次にawaitで解決して、Responseオブジェクトを返している
  // console.log(response.body); // ReadableStream { locked: false, state: 'readable', supportsBYOB: false }

  if(response.status !== 200) throw new Error();

  const data = await response.json();
  // json() ... response.bodyをJSONとして解析し、欲しいデータを含んだPromiseオブジェクトとして返す
  // await ... response.json()が返すPromiseの解決値、つまりJavaScriptオブジェクトが得られる
  // console.log(data) // {message: "...", tasks: [{...}, {...}]}
  return data.tasks as TaskDocument[];
}


const ExpiredPage: React.FC = async () => {
  const expiredTasks = await getExpiredTasks();

  return(
    <div className="text-gray-800 p-8 h-full overflow-y-auto pb-24">

    <header className="flex justify-between items-center">
      <h1 className="text-2xl font-bold flex items-center">
        Expired Tasks
      </h1>
    </header>

    <div className="mt-8 flex flex-wrap gap-4">
      {/* <TaskCard  /> */}
      { 
        expiredTasks.length === 0 ? (
          <p className="text-red-500">期限切れのタスクはありません。</p>
        ) : (
          expiredTasks.map(task => <TaskCard key={ task._id } task={ task } />)
        )
      }

    </div>
  </div>
  )
}

export default ExpiredPage;
