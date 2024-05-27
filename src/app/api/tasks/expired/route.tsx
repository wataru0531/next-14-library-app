

// 期限切れページのapi (現在の日付より前の日付のタスク)
// タスクが未完了であること かつ　タスクの期限が現在の日付より小さいこと の2つを条件とする

import { NextResponse } from "next/server";

import { connectDb } from "../../../../utils/database";
import { TaskModel, TaskDocument } from "../../../../models/task" 

export const GET = async () => {
  // new Date() ... ISO8601形式の文字列で返す。2024-05-24T14:34:13.146Z
  // toLocaleString() ... 2024/5/24  のように見やすくする
  // replace(/\//g, "-") ... / を - にする。→ 2024-05-24
  const currentDate = new Date().toLocaleDateString("ja-JP", {
    year: "numeric",  // 日付を "yyyy/MM/dd" 形式の文字列にフォーマットする
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, "-");

  try{
    await connectDb(); // MongoDBのデータベースに接続

    // 条件をつけてデータを取得する。→ 完了のみ取得
    const completedTasks: TaskDocument[] = await TaskModel.find({
      isCompleted: false,
      dueDate: { $lt: currentDate } // $lt ... 〜小さい という条件(mongoDBの仕様)
    });

    return NextResponse.json({ message: "タスク取得成功", tasks: completedTasks });

  } catch(error) {
    console.log(error);
    return NextResponse.json({ message: "タスク取得失敗" }, { status: 500 });
  }
}

// タスクの一覧はキャッシュを利用せず、最新のデータを取得する
export const dynamic = "force-dynamic";

// Next.jsはデフォルトで静的最適化を行うために、できるだけ静的ページを生成。
// しかし、特定のルートやページでは、リクエストごとに動的な内容を返す必要がある時がある。
// force-dynamicとすると、このAPIルートが必ず動的にレンダリングされるように指示。
// → リクエストごとに新しいレスポンスが生成され、キャッシュが使用されない。