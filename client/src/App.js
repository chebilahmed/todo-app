import { useState,useEffect } from "react";
const App = ()=>{
	const [todo, setTodo]=useState([]);
	const base_url="http://localhost:3001/";

	useEffect(()=>{
		AfficheTodo()},[]
	)

	const AfficheTodo = async ()=>{
		const data = await fetch(base_url+"todos").then(res =>res.json())
		setTodo(data)
		
	}

	const DeleteTodo = async (id)=>{
		const data = await fetch(base_url+"todo/delete/"+id , {
			method: "DELETE",
		}).then(res =>res.json())
		setTodo(todo.filter(todo => todo._id !== data._id))
		
		
	}
	return (
		<div className="App">
			{todo.map((todo)=>
				<div key={todo._id} onClick={()=> DeleteTodo(todo._id)}>{todo.text}</div>
			)}
		</div>
	)
}

export default App;