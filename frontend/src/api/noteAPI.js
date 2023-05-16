// 提交新的乐谱
const newNote = async ({ title, content, author, comment, category, username, token }) => {
  return await fetch(`/api/addNote`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'post',
    body: JSON.stringify({
      title, content, author, category, comment, username,
    })
  }).then(res => res.json())
}

// 列出username创建的乐谱
const listUserCreatedNote = async ({ username, pageSize, pageNum, token }) => {
  return await fetch(`/api/listUserCreatedNote/p/${pageNum}/s/${pageSize}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    method: 'post',
    body: JSON.stringify({
      username
    })
  }).then(res => res.json())
}

export { newNote, listUserCreatedNote }