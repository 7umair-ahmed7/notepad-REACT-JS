import React, { useEffect, useState } from 'react'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [filterTodos, setFilterTodos] = useState([])
  const [showFinished, setShowFinished] = useState(false)
  const [note, setNote] = useState(false)

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleAdd = () => {
    if (todo.length > 3) {
      setTodos([...todos, { todo: todo, isCompleted: false }])
      setTodo('')
    }

  }

  const handleEdit = (i) => {
    let reqTodo = todos.filter((todo, ind) => {
      return ind == i;
    })
    console.log(reqTodo)
    setTodo(reqTodo[0].todo)

    let del = todos.filter((todo, ind) => {
      return ind != i;
    })
    setTodos(del)
  }

  const handleDelete = (i) => {
    let del = todos.filter((todo, ind) => {
      return ind != i;
    })
    setTodos(del)
  }

  const handleComplete = (i) => {
    let newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted;
    setTodos(newTodos)
  }

  const handleFinished = () => {
    if (showFinished === false) {
      let newTodos = todos.filter((todo, ind) => {
        return todo.isCompleted === true;

      })
      setFilterTodos(newTodos)

    }
    else {
      setFilterTodos(todos)
    }
    setShowFinished((prev) => !prev)
  }

  const handleNote = () => {
    setNote(!note)
  }



  return (
    <>
      <div className="notes-app-container m-auto bg-blue-400 p-3 min-h-[80vh] w-[75vw] relative">
        <h1 className='font-semibold text-xl mb-2'>Todos</h1>
        <hr />
        <div className="upper-container m-4 flex gap-2">
          <input className='px-2 py-2 rounded-xl w-[400px]' value={todo} onChange={handleChange} type="text" placeholder='Enter Tasks' />
          <button onClick={handleAdd} className='add-notes border border-black px-2 py-2  rounded-xl bg-blue-800 text-white' >Save Todo</button>
        </div>
        <div className='note ml-4 mb-2'>
          <button className='border border-black rounded-xl bg-blue-800 text-white px-1 py-1' onClick={handleNote}>{note ? "Close note" : "Display note"}</button>
          {note ? <div> "more than three characters are must"</div> : ""}
        </div>

        <div className="show-finished m-4 flex gap-2">
          <input checked={showFinished} onChange={handleFinished} type="checkbox" className='' name="" id="" />
          <span className='font-medium text-base' >Show Only Completed Tasks</span>
        </div>
        <div className='notes-all-container flex flex-col gap-2'>
          {filterTodos.map((todo, index) => {
            return <div key={index} className='todo rounded-xl flex border border-black justify-between items-center p-2'>
              <div className='flex gap-6 items-center justify-center'>
                <input checked={todo.isCompleted} onChange={() => handleComplete(index)} type="checkbox" className='cursor-pointer' name="" id="" />
                <span className={`${todo.isCompleted ? "line-through" : ""}`}>{todo.todo}</span>
              </div>
              <div className="buttons flex gap-1">
                <button onClick={() => handleEdit(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white '>Edit</button>
                <button onClick={() => handleDelete(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white'>Delete</button>
              </div>
            </div>
          })}
        </div>


      </div>


    </>
  )
}

export default Todo
