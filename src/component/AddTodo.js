import React from 'react'

function AddTodo({ text, setText, addTodo, setTrigModal }) {
  const handleAddTodo = e => {
    e.preventDefault();
    if ((!text || text.trim() === '')) alert('Title is required!');
    else {
      addTodo({ variables: { todo: text } });
      setTrigModal(true)
    }
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleAddTodo}
        >
          <div className="input-group mb-3 d-flex">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={text}
              onChange={e => setText(e.target.value)}
              autoFocus
              style={{ maxWidth: '300px' }}
              className="form-control"
            />
            <button type="submit" className="btn btn-outline-secondary">Add Todo</button>
          </div>
        </form>
      </div >
    </div>
  )
}

export default AddTodo
