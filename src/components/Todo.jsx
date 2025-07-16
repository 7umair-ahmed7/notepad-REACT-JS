import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom'

const Todo = () => {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(false)
  const [errorNumDig, setErrorNumDig] = useState(false)


  useEffect(() => {
    console.log("todos state ", todos)
  }, [todos])

  useEffect(() => {
    let getTodos = localStorage.getItem("todoSave")
    console.log(getTodos)
    if (getTodos) {
      try {
        setTodos(JSON.parse(getTodos));
      } catch (error) {
        console.error("Error parsing local storage data:", error);
      }
    }
    else {
      setTodos([]);
    }
  }, [])

  const saveToLS = (saveData) => {
    localStorage.setItem("todoSave", JSON.stringify(saveData))
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const errorFunNumDig = () => {
    setErrorNumDig(true)
  }

  const handleAdd = () => {
    if (todo.length > 3) {
      setTodos([...todos, { todo: todo, isCompleted: false }])
      setTodo('')
      setErrorNumDig(false)
      saveToLS([...todos, { todo: todo, isCompleted: false }])
    } else {
      setErrorNumDig(true)

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
    saveToLS()
  }

  const handleDelete = (i) => {
    let del = todos.filter((todo, ind) => {
      return ind != i;
    })
    setTodos(del)
    saveToLS(del)
  }

  const handleComplete = (i) => {
    let newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleFinished = () => {
    setShowFinished(!showFinished)

  }





  return (
    <>
      <div className="notes-app-container m-auto bg-blue-400 p-3 h-[80vh] w-[75vw] relative">
        <h1 className='font-semibold text-xl mb-2'>Todos</h1>
        <hr />
        <div className="upper-container m-4 flex gap-2">
          <input className='px-2 py-2 rounded-xl w-[400px]' value={todo} onClick={errorFunNumDig} onChange={handleChange} type="text" placeholder='Enter Tasks' />
          <button onClick={handleAdd} className='add-notes border border-black px-2 py-2  rounded-xl bg-blue-800 text-white' >Save Todo</button>
        </div>
        <div className='note ml-4 mb-2 h-[24px]'>
          {errorNumDig && todo.length <= 3 ? <div className='text-red-600'> more than three characters are must</div> : ""}
        </div>

        <div className="show-finished m-4 flex gap-2">
          <input onChange={handleFinished} type="checkbox" className='' name="" id="" />
          <span className='font-medium text-base' >Show All Tasks</span>
        </div>
        <div className='notes-all-container flex flex-col gap-2 h-[40vh] overflow-auto m-4'>
          {todos.length == 0 ? "no todos availabe" : todos.map((todo, index) => {
            return showFinished ? <div key={index} className='todo rounded-xl flex border border-black justify-between items-center p-2'>
              <div className='flex gap-6 items-center justify-center'>
                <input checked={todo.isCompleted} onChange={() => handleComplete(index)} type="checkbox" className='cursor-pointer' name="" id="" />
                <span className={`${todo.isCompleted ? "line-through" : ""}`}>{todo.todo}</span>
              </div>
              <div className="buttons flex gap-1">
                <button onClick={() => handleEdit(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white '>Edit</button>
                <button onClick={() => handleDelete(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white'>Delete</button>
              </div>
            </div> :
              todo.isCompleted ? null : <div key={index} className='todo rounded-xl flex border border-black justify-between items-center p-2'>
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
