
// モデルを定義


import mongoose, { Document } from "mongoose";
// Documentオブジェクト
// → データの取得や設定、データの検証などもメソッドやプロパティを提供するオブジェクトであり、型。
// Documentはクラスであり、TypeScriptの特性でクラスは型としても機能する
// Next.jsのResponseオブジェクトやRequestオブジェクトもそうで、クラスで定義されてあるので型としてもオブジェクトとしても
// 使うことができる。

// 組み込みオブジェクトのPromiseはTypeScriptで定義されていて、それを使う

export interface Task {
  title: string
  description: string
  dueDate: string
  isCompleted: boolean
}
// id ... mogodbでは自動でidが付与されるので定義は不要

export interface TaskDocument extends Task, Document {
  createdAt: Date
  updatedAt: Date
}

// スキーマ
const taskSchema = new mongoose.Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }

  // trueとするとcreatedAt、updatedAtが自動生成
}, { timestamps: true }); 

// Taskというモデルを生成。MongoDBのコレクション名としても使われる。

// すでにTaskモデルが作成されていたら、mongoose.models.Taskを参照。Taskは任意につけた"Task"を参照
// modelsの中に作成されていなかったら、mongoose.model("Task", taskModel)で生成
export const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema)