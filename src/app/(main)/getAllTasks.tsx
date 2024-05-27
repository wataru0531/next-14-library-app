import { TaskDocument } from "@/models/task";

// task一覧を取得する関数
export const getAllTasks = async (): Promise<TaskDocument[]> => {
  const response = await fetch(`${process.env.API_URL}/tasks`, {
    cache: "no-store", // 一覧は頻繁に更新されるので
  });

  if (response.status !== 200) throw new Error(); // 失敗

  const data = await response.json();
  // ここで取得したdataはany型
  // よりコードを安全にするためにasでキャストしている。
  return data.tasks as TaskDocument[];
};
