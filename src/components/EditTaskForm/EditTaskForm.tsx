

// 編集フォーム

"use client"

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { TaskDocument } from "@/models/task";
import { FormState, updateTask } from "@/actions/task";

interface EditTaskFormPropsType {
  task: TaskDocument
}

// サーバーアクションで更新
// 分割代入したオブジェクトをさらに分割代入でプロパティを取得している
const EditTaskForm: React.FC<EditTaskFormPropsType> = (
  { task }
  // { task: { _id: initialId, title: initialTitle, description: initialDescription, dueDate: initialDueDate, isCompleted: initialIsCompleted  } }
) => {
  // console.log(task); // { _id: '6644cdc16b975dd97459a872', title: "", ... }
  
  const [ title, setTitle ] = useState(task.title);
  const [ description, setDescription ] = useState(task.description);
  const [ dueDate, setDueDate ] = useState(task.dueDate);
  const [ isCompleted, setIsCompleted ] = useState(task.isCompleted);
  
  // useFormStateにコールバックで渡すために、idを固定しておく。
  const updateTaskWithId = updateTask.bind(null, task._id);

  const initialState: FormState = { error: "" }; // サーバーアクションの戻り値の初期値
  const [ state, formAction ] = useFormState(updateTaskWithId, initialState);
  
  const SubmitButton = () => {
    // サーバーアクションの実行中はボタンを無効化
    const { pending } = useFormStatus();

    return(
      <button 
        type="submit"
        className="
          mt-8 py-2 w-full rounded-md text-white text-sm font-semibold shadow-sm
          bg-gray-800 hover:bg-gray-700 disabled:bg-gray-400
        "
        disabled={ pending }
      >
        Edit
      </button>
    )
  }

  // const onChangeSetTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.value);
  //   setTitle(e.target.value)
  // }

  // const onChangeSetIsCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target.checked);
  //   setIsCompleted(e.target.checked)
  // }

  return(
    <div className="mt-10 mx-auto w-full max-w-sm"> 
      <form action={ formAction }>
        <div>
          <label htmlFor="title" className="block text-sm font-medium ">title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            value={ title }
            onChange={ (e) => setTitle(e.target.value) }
            // onChange={ onChangeSetTitle }
            required 
            className="block mt-2 py-1.5 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="description" className="block text-sm font-medium ">Description</label>
          <input 
            type="text" 
            id="description" 
            name="description" 
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
            required 
            className="block mt-2 py-1.5 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="dueDate" className="block text-sm font-medium ">DueDate(期限)</label>
          <input 
            type="date" 
            min="2020-01-01"
            max="2099-12-31"
            id="dueDate" 
            name="dueDate"
            value={ dueDate }
            onChange={ (e) => setDueDate(e.target.value) }
            required 
            className="block mt-2 py-1.5 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        {/*　完了ステータス */}
        <div className="mt-6 flex items-center">
          <input 
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            checked={ isCompleted }
            onChange={ (e) => setIsCompleted(e.target.checked) }
            // onChange={ onChangeSetIsCompleted }
            className="mr-2 w-4 h-4"
          />
          <label htmlFor="isCompleted" className="text-sm">タスクを完了にする</label>
        </div>

        <SubmitButton />
        { 
          state.error !== "" && ( 
            <p className="mt-2 text-red-500 text-sm">{ state.error }</p>
          )
        }
        
      </form>
    </div>
  )
}

export default EditTaskForm;