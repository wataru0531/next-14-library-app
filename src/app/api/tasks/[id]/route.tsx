

// 特定の_idのタスクを取得するapi
// routeディレクトリにもダイナミックルーティングを利用できる

import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "../../../../utils/database";
import { TaskModel, TaskDocument } from "../../../../models/task";


export const GET = async (
  request: NextRequest, 
  { params }: { params: { id: string } } // 
) => {
  try{
    await connectDb(); // データベース接続を確立

    const task: TaskDocument | null = await TaskModel.findById(params.id);

    if(!task) NextResponse.json({ message: "タスクが存在しません" }, { status: 404 });

    return NextResponse.json({ message: "タスク取得成功", task });
  } catch(error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 })
  }
}

// キャッシュを利用せずにリクエストごとに実行されるようにする
export const dynamic = "force-dynamic";