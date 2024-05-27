

// task一覧を取得するAPI

import { NextResponse } from "next/server";

import { connectDb } from "../../../utils/database"
import { TaskModel, TaskDocument } from "../../../models/task" 

export const GET = async () => {

  try{
    await connectDb(); // MongoDBのデータベースに接続

    const allTasks: TaskDocument[] = await TaskModel.find();

    return NextResponse.json({ message: "タスク取得成功", tasks: allTasks });

  } catch(error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
}

// タスクの一覧はキャッシュを利用せず、最新のデータを取得する
export const dynamic = "force-dynamic";

// Next.jsはデフォルトで静的最適化を行うために、できるだけ静的にページを生成。
// しかし、特定のルートやページでは、リクエストごとに動的な内容を返す必要がある時がある。
// force-dynamicとすると、このAPIルートが必ず動的にレンダリングされるように指示。
// → リクエストごとに新しいレスポンスが生成され、キャッシュが使用されない。