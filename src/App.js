import React, { useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
const firstRender = useRef(true)
const [inputValue, setInputValue] = useState('')
const [toDos, setToDos] = useState([])

const addToDo = (e) => {
  e.preventDefault()
  if (inputValue.trim() === '') {
    return
  }

  setToDos([...toDos, {
    text: inputValue,
    id: uuidv4()
  }])

  setInputValue('')
}
console.log(firstRender)
const removeToDo = (id) => {
  setToDos(toDos.filter(todo => todo.id !== id))
}

useEffect(() => {
  if(firstRender.current) {
    console.log('true')
    firstRender.current = false
  } else {
    localStorage.setItem("Todo", JSON.stringify([...toDos]))
    console.log('not first page load')
  }
},[toDos])

useEffect(() => {
  const newToDos = localStorage.getItem("Todo")
  setToDos(JSON.parse([...toDos, newToDos]))
}, [])

  return (
    <div className="App">
      <div className='container'>
        <form onSubmit={addToDo}>
          <input type="text"
          placeholder="Add a task..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        {toDos.map(todo => (
          <div key={todo.id} className="todo">
            <p>{todo.text}</p>
            <i onClick={() => removeToDo(todo.id)} className="fas fa-trash"></i>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
