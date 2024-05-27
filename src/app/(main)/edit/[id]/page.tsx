

// task編集ページ

import EditTaskForm from "@/components/EditTaskForm/EditTaskForm";
import { TaskDocument } from "@/models/task";

interface Params {
  params: { id: string }
}

// 
const getTask = async (_id: string): Promise<TaskDocument> => {
  const response = await fetch(
    `${process.env.API_URL}/tasks/${_id}`,
    {
      cache: "no-store",
    }
  );
  // console.log(response)

  const data = await response.json();
  // console.log(data);
  return data.task as TaskDocument;
}

// const EditTaskPage: React.FC<Params> = (props) => {
  // console.log(props) // { params: { id: '1' }, searchParams: {} }
const EditTaskPage: React.FC<Params> = async ({ params }) => {
  // console.log(params) // { id: '1' }
  const id = params.id;

  const task = await getTask(id);
  // console.log(task) // { _id: '6644cdc16b975dd97459a872', title: "", ... }

  return(
    <div className="flex flex-col justify-center py-20 ">
      <h2 className="text-center text-2xl font-bold">Edit Task</h2>
      
      <EditTaskForm task={ task } />

    </div>
  )
}

export default EditTaskPage;