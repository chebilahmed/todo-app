import { useState,useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
	const [todos, setTodos]=useState([]);
	
	const [popActive , setPopActive] = useState(false);
	const [newTodos, setNewTodos] = useState("");
	
	useEffect(()=>{
	
		GetTodos();
		
		console.log(todos)
	}, [])

	const GetTodos =() =>{
		fetch(API_BASE + "/todos")
		.then(res => res.json())
		.then(data => setTodos(data))
		.catch(err => console.error("error",err))
	}
	
	const CompleteTodos =async id  =>{
		
		console.log(id)
		const data =await fetch(API_BASE + "/todo/complete/"+id)
		.then(res => res.json())
		
		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete=data.complete;
			}
			return todo;
		}))

		
	}

	const DeleteTodos =async id  =>{
		
	   
		const data =await fetch(API_BASE + "/todo/delete/"+id , {method:"DELETE"})
		.then(res => res.json())
		
		setTodos(todos.filter(todo => todo._id !== data._id))

		
	}

    const addTodo = async ()=>{
        const data =await fetch(API_BASE + "/todo/new/" ,
         {method:"POST",
         headers:{"Content-Type":  "application/json"},
         body:JSON.stringify({
            text:newTodos
         })
        }).then(res => res.json())

        setTodos([...todos,data])
        setPopActive(false)
        setNewTodos("")
    }

	return (
		<div className="App">
			<h1>Welcome , ahmed</h1>
			<h4>Your tasks</h4>
			<div className="todos">
                {todos.map(todo => (

                <div className={"todo" + (todo.complete ? " is-complete" : "" )}
                key={todo._id}>
                    <div className="checkbox"  onClick={() => CompleteTodos(todo._id)}></div>

                    <div className="text">{todo.text}</div>
                    <div className="delete-todo" onClick={() => DeleteTodos(todo._id)}>X</div>


                </div>
                ))}
			</div>
			<div className="addPopup" onClick={()=> {setPopActive(true);}}>+</div>
            {popActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopActive(false)}>X</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input type="text"  className="add-todo-input" onChange={e => setNewTodos(e.target.value)} value={newTodos}/>
                        <div className="add-task" onClick={addTodo}>Add Todo</div>
                    </div>
                </div>
            ): ""}
		</div>
		

	);
}

export default App;
