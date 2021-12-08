import React from 'react'

function TodoCards({ data, checkTodo, editTodo, deleteTodo, setTrigModal }) {
  const handleCheckTodo = (e, item) => {
    checkTodo({ variables: { todoid: item.id, status: e.target.checked } });
    setTrigModal(true);
  }
  const handleEditTodo = (item) => {
    const newText = prompt();
    if (newText === '' || newText?.trim() === '') alert('Title is required!');
    else if (newText) {
      editTodo({ variables: { todoid: item.id, newDetail: newText } })
      setTrigModal(true)
    }
  }
  const handleDeleteTodo = (item) => {
    deleteTodo({ variables: { todoid: item.id } });
    setTrigModal(true);
  }

  return (
    <div>
      {data?.todolists?.map((item => (
        <div key={item.id} className='d-flex justify-content-between align-items-center' style={{ width: '400px' }}>
          <div className='d-flex align-items-center border m-2' style={{ width: '200px', height: '50px', background: item.status ? 'lightGreen' : 'lightYellow' }}>
            <span className='p-4'>{item?.detail}</span>
          </div>
          <div className='d-flex align-items-center'>
            <input checked={item.status} onChange={e => handleCheckTodo(e, item)} type="checkbox" className='form-check-input' />
            <button className='btn btn-primary p-2 m-2' onClick={() => handleEditTodo(item)}>edit</button>
            <button onClick={() => handleDeleteTodo(item)} className='btn btn-danger p-2 m-2'>delete</button>
          </div>
        </div >
      )))
      }

    </div >
  )
}

export default TodoCards
