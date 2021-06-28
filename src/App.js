import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import React, {useState} from "react"


function Todo({key, index, list, removeTask, completeTask}) {
  return (
    <div className='todo' style={{textDecoration: list.isCompleted ? 'line-through': ''}}>
      {list.text}
      <div>
        <button className='btn btn-primary' onClick={()=> removeTask(index)}>Remove</button>
        <button className='btn btn-secondary' onClick={() => completeTask(index)}>Completed</button>
      </div>
    </div>
  )
}

function TodoForm({addTask}) {
  const [value, setValue] = useState('');

  const handleSumbit = (e) => {
    e.preventDefault();
    if(value === '') {
      alert('please add a task');
    } else {
      addTask(value);
      setValue('');
    }
  }
  return (
    <form onSubmit={handleSumbit} >
      <div className='mb-3'>
        <label for='addTask' className='form-label'>Add Task</label>
        <input type='text' className='form-control' id='addTask' value={value} onChange={(e) => setValue(e.target.value)} />
        <button type='submit' className="btn btn-success">Submit</button>
      </div>
    </form>
  )
}

function App() {
  const [list, setList] = useState([
    { text: 'Learn React Js', isCompleted: false},
    { text: 'Learn Node', isCompleted: false},
    { text: 'Lose 5 kg in 3 months', isCompleted: false}
  ])

  const addTask = (newTask) => {
    const newObj = {text: newTask};
    const newList = [...list, newObj];
    setList(newList);
  }

  const removeTask = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  }

  const completeTask = (index) => {
    const newList = [...list];
    newList[index].isCompleted = true;
    setList(newList)
  }

  return (
    <div className="app">
      <div className='todo__list'>
        {list.map((item, index) => (
          <Todo
            key={index}
            index={index}
            list={item}
            removeTask={removeTask}
            completeTask={completeTask}
          />
        ))}
      </div>
      <TodoForm addTask={addTask} />
    </div>
  );
}

export default App;
