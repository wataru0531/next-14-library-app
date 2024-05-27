

// 新規作成フォーム

"use client";

import { useFormState, useFormStatus } from "react-dom";

import { FormState, createTask } from "@/actions/task";

const NewTaskForm: React.FC = () => {

  const initialState: FormState = { error: "" }

  // useFormState ... サーバーアクションの結果を所得
  // 第１引数 ... サーバー側で実行したい関数
  // 第２引数 ... 初期値
  // formActionの実行結果がstate(第１引数)に格納
  // formクリック → formAction実行 → createTaskがサーバー側で実行 → stateに格納
  const [ state, formAction ] = useFormState(createTask, initialState)

  // サーバーアクションの実行状態を取得
  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return(
      <button 
        type="submit"
        className="
          mt-8 py-2 w-full rounded-md text-white bg-gray-800  text-sm font-semibold shadow-sm 
          hover:bg-gray-700 disabled:bg-400-gray
        "
        disabled={ pending } // trueの時に非活性
      >
        Create
      </button>
    )
  }

  return(
    <div className="mt-10 mx-auto w-full max-w-sm"> 
      {/* サーバーアクションでタスクを作成 */}
      <form action={ formAction }>
        <div>
          <label htmlFor="title" className="block text-sm font-medium ">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
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
            required 
            className="block mt-2 py-1.5 w-full rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
          />
        </div>

        <SubmitButton />

        { 
          state.error && (
            <p className="mt-2 text-red-500 text-sm">
              { state.error }
            </p>
          ) 
        }
      </form>
    </div>
  )
}

export default NewTaskForm;