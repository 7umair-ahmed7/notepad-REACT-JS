import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
const NotesApp = () => {

  const [open, setOpen] = useState(false);
  const [notesData, setNotesData] = useState([])
  const [noteData, setNoteData] = useState({
    title: "",
    note: ""
  })
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    let notesString = localStorage.getItem("notesSave")
    if (notesString) {
      let notesObtData = JSON.parse(notesString)
      setNotesData(notesObtData)
    } else {
      setNotesData([])
    }

  }, [])

  useEffect(() => {

    setFilterData(notesData)

  }, [notesData])

  const saveToLS = (notesData) => {
    localStorage.setItem("notesSave", JSON.stringify(notesData))
  }


  const handleAdd = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleTitle = (e) => {

    setNoteData({ ...noteData, title: e.target.value })


  }
  const handleNote = (e) => {
    setNoteData({ ...noteData, note: e.target.value })

  }

  const handleSave = (e) => {
    setNotesData([...notesData, noteData])
    setOpen(false)
    setNoteData({
      title: "",
      note: ""
    })
    saveToLS([...notesData, noteData])
  }
  const handleEdit = (i) => {
    setOpen(true)
    let reqNote = notesData.filter((n, index) => {
      return index == i
    })

    setNoteData(reqNote[0])

    setNotesData(notesData.filter((n, ind) => {
      return ind != i
    }))
    saveToLS(notesData.filter((n, ind) => {
      return ind != i
    }))
  }

  const handleDelete = (i) => {
    setNotesData(notesData.filter((n, index) => {
      return index != i
    }))
    saveToLS(notesData.filter((n, index) => {
      return index != i
    }))

  }
  const handleSearch = (e) => {
    let searchValue = e.target.value;
    let newData = notesData.filter(note => {
      return note.title.toLowerCase().includes(searchValue.toLowerCase());

    })
    setFilterData(newData)
  }





  return (
    <div>

      <div className="notes-app-container m-auto bg-blue-400 p-3 h-[80vh] w-[75vw] relative">
        <h1 className='font-semibold text-xl mb-2'>Notes</h1>
        <hr />
        <div className="upper-container m-4 flex gap-2">
          <input className='px-2 py-2 rounded-xl w-[400px]' onChange={handleSearch} type="text" placeholder='Search notes' />
          <button onClick={handleAdd} className='add-notes border border-black px-2 py-2  rounded-xl bg-blue-800 text-white'>Add Notes</button>
        </div>
        <div className='notes-all-container flex flex-col gap-2 h-[55vh] overflow-auto m-4'>
          {filterData.length == 0 ? "no notes available" : filterData.map((notes, index) => {
            return <div key={index} className='notes rounded-xl flex border border-black justify-between items-center p-2'>
              <div>
                <h2 className='font-semibold text-lg'>{notes.title.slice(0, 70)}</h2>
                <p>{notes.note.slice(0, 70)}</p>
              </div>
              <div className="buttons flex gap-1">
                <button onClick={() => handleEdit(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white '>Edit</button>
                <button onClick={() => handleDelete(index)} className='border border-black px-2 py-1  rounded-xl bg-blue-800 text-white'>Delete</button>
              </div>
            </div>
          })}
        </div>
        {open &&
          <div className="modal absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col gap-2 bg-slate-500 p-4 w-[40vw] rounded-xl">
            <IoClose onClick={handleClose} className='cursor-pointer absolute right-0 mr-2' />
            <h2 className='text-lg font-semibold'>Write notes</h2>
            <div className='flex flex-col'>
              <label htmlFor="title">Title</label>
              <input name='title' value={noteData.title} onChange={handleTitle} className='p-2 border border-black' type="text" placeholder='Title here' />
            </div>
            <div className='flex flex-col'>
              <label htmlFor="notes">Notes</label>
              <textarea value={noteData.note} onChange={handleNote} className='p-2 border border-black' name="notes" id="" placeholder='Notes here'>
              </textarea>
            </div>
            <button onClick={handleSave} className='save-notes border border-black px-2 py-1  rounded-xl bg-blue-800 text-white'>Save</button>
          </div>
        }

      </div>
    </div>

  )
}

export default NotesApp
