

// サーバーアクション
// 新規作成、更新、削除

// ドキュメントを新規作成して、コレクションに挿入
// → REST APIで更新していたものを関数経由で更新できるようにしたもの

"use server";

import { redirect } from "next/navigation";

import { TaskModel, Task } from "../models/task";
import { connectDb } from "../utils/database";

export interface FormState {
  error: string
}

// 新規作成
export const createTask = async (state: FormState, formData: FormData) => {
  // 新規作成するTaskオブジェクト
  const newTask: Task = {
    title: formData.get("title") as string, // 必ずtitleが存在するとして、as stringで強制する
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: false, // Task作成フォームには存在しないがTask作成時には未完了であるためデフォルトでfalseにする
  }

  // データベースに登録
  try{
    await connectDb(); // データベース接続を確立

    // 新しいドキュメント(レコード)をコレクションに挿入
    await TaskModel.create(newTask);

  }catch(error){
    state.error = `タスクの作成に失敗しました。${error}` // stateオブジェクトにerrorプロパティを追加
    return state;
  }

  redirect("/");
}


// 更新
// 第２引数 state ... フォームの状態を表す。エラーや他の状態を管理。
// 第３引数 formData ... フォームから送信されたデータを格納。
export const updateTask = async (id: string, state: FormState, formData: FormData) => {
  // console.log(state); //

  const updateTask: Task = {
    title: formData.get("title") as string, 
    description: formData.get("description") as string,
    dueDate: formData.get("dueDate") as string,
    isCompleted: Boolean(formData.get("isCompleted")), 
  }

  try{
    await connectDb(); 

    // updateOne(更新条件, 更新するデータ)
    await TaskModel.updateOne({ _id: id }, updateTask); // MongoDBのidは、_id でアンダーバーがつく。

  }catch(error){
    state.error = `タスクの更新に失敗しました。${error}`
    return state;
  }

  redirect("/");
}

// タスクを1つ削除
export const deleteTask = async (id: string, state: FormState) => {
  // console.log(state); //

  try{
    await connectDb(); 

    await TaskModel.deleteOne({ _id: id }); // idを指定するだけ

  }catch(error){
    state.error = `タスクの削除に失敗しました。${error}`
    return state;
  }

  redirect("/");
}

