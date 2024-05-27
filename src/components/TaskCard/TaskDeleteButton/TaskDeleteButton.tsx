
// 削除ボタン
// サバーアクション使用

"use client"

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { deleteTask, FormState } from "@/actions/task";
// → useFormState、useFormStatusを使うため

import Link from "next/link"
import { FaTrashAlt } from "react-icons/fa";

interface TaskDeleteButtonType {
  id: string
}

const TaskDeleteButton: React.FC<TaskDeleteButtonType> = ({ id }) => {
  // deleteTaskの引数にidを入れてbindする
  // → useFormStateの引数のコールバックに入れるためにbindしてるだけ
  const deleteTaskWithId = deleteTask.bind(null, id);
  const initialState: FormState = { error: "" }
  
  const [ state, formAction ] = useFormState(deleteTaskWithId, initialState);

  const SubmitButton = () => {
    // pending ... フォームが通信中のときtrueを返す
    const { pending } = useFormStatus();

    return(
      <button 
        type="submit"
        disabled={ pending }
        className="hover:text-gray-700 text-lg cursor-pointer disabled:bg-gray-400"
      >
        <FaTrashAlt />
      </button>
    )
  } 

  useEffect(() => {
    if(state && state.error !== ""){
      alert(state.error)
    }
  }, [ state ]);

  return(
    <form action={ formAction }>
      <SubmitButton />
    </form>
  )
}

export default TaskDeleteButton;