
// 編集ボタン

interface TaskEditButtonType {
  id: string
}

import Link from 'next/link'
import React from 'react'
import { FaPen } from 'react-icons/fa'

const TaskEditButton: React.FC<TaskEditButtonType> = ({ id }) => {
  return (
    <Link href={`/edit/${id}`}>
      <FaPen className='hover:text-gray-700 text-lg cursor-pointer' />
    </Link>
  )
}

export default TaskEditButton