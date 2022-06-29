import React, {useState} from "react";



//create your first component
const Home = () => {
	const[newItem, setNewItem] = useState("");
	const[items, setItems] = useState([]);

	const handleSubmit= (event)=> {
		event.preventDefault()
		if(newItem !=("")){	
			const addItems = {
				id: Math.floor(Math.random()*1000),
				value: newItem
			}
			setItems( [...items,addItems]);
			setNewItem("");
	    }
	
    }
	const deleteItem = (id) =>{
	const filterItems =[...items].filter(( items )=> items.id !== id);
	setItems(filterItems);
	}
		
	return (
		<div className="Home">
			<h1 className="todos">Todos</h1>
			<div className="list-card">
			<form onSubmit={handleSubmit}>
				<input type="text"
				placeholder = "add and item..."
				value={newItem}
				onChange={e=>setNewItem(e.target.value)}
				/>
				<button>Add</button>
			</form>
			<ul className="list">
				{items.map(item=>{
					return(
						<li key={item.id}>{item.value}<button onClick={()=>deleteItem(item.id)}>X</button></li>
					)
				})}

			</ul>
			
		</div>	
		</div>
	);
}

export default Home;
