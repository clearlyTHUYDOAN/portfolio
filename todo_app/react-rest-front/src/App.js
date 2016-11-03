//TO DO APP CUSTOM API.

import React from 'react';
import './App.css';
const axios = require('axios');

class ToDoApp extends React.Component {
	constructor(){
		super();
		this.state = {
			inputvalue: "",
			selectvalue: "all",
			incompletestatus: "",
			todos:[]
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.handleInput = this.handleInput.bind(this);
		this.handleSelectValue = this.handleSelectValue.bind(this);
		this.handleClear = this.handleClear.bind(this);
		this.handleDisable = this.handleDisable.bind(this);
		/*Without .bind(this here, this would refer to the method. */
	}

	handleClick (index) {
		let clickcomplete = this.state.todos;
		clickcomplete[index].done = !clickcomplete[index].done
		this.setState ({
			todos: clickcomplete
		})
	};

	handleAdd (event) {
		let addcomplete = this.state.todos;
		addcomplete.push({text: this.state.inputvalue, done: false, id: this.state.todos.length + 1})
		this.setState ({
			todos: addcomplete
		})
		this.handleDisable();
	};

	handleInput (event) {
		this.setState({inputvalue: event.target.value});
		// Grabs the value you type and changes this.state.inputvalue so you can use it in handleAdd.
	};

	handleSelectValue(event) {
		this.setState({selectvalue: event.target.value});
		// Grabs the value for the relevant option in the select menu and changes this.state.selectvalue for use in render().
	};

	handleClear () {
		let cleartest = this.state.todos; //an array of objects//
		var clearcomplete = cleartest.filter((task) => {
			return task.done === false
		});
		this.setState({
			todos: clearcomplete
		})
	};

	handleDisable () {
		//Check for all incomplete items.
		let allincomplete = true
		for (var i = 0; i < this.state.todos.length; i++) {
			if (this.state.todos[i].done !== false) {
				allincomplete = false
			}; 
		};
		this.setState({incompletestatus: allincomplete});
	};

	//Checks todos array before mounting to setState of this.state.incomplete status regardless of done value data.
	componentWillMount() {
    axios.get ("http://localhost:8080/").then((response) => {
      //where response is the name of the response object
      this.setState({todos: response.data})
    });
		this.handleDisable(); //Can only do this after you have an array of data.
	};

	componentWillUnmount() {
    axios.post ("http://localhost:8080/savetodos", this.state.todos).then((response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
	}

	render(){
		
		/*Conditions for rendering list items depending on select menu option. */
		let todosJSX = []
		todosJSX = this.state.todos.filter((task) => {
			if (this.state.selectvalue === "active") {
				return task.done === false
			} else if (this.state.selectvalue === "complete") {
				return task.done === true
			} else if (this.state.selectvalue === "all") {
				return true === true
				//you can also write "return true"
			};
		}).map((task, index) => {
			return (
			<li key={index} className="list-group-item">
				<input checked={task.done === true? "checked" : ""} 
					onChange={this.handleDisable} 
					id={index} 
					onClick={this.handleClick.bind(this, index)} 
					type="checkbox" 
					value="on" />
				<label className={task.done === true? "done" : ""}>{task.text}</label>
			</li>)
		});

		return (
			<div className="container">
				<h1 className="text-center">todos</h1>

				<Input inputvalue={this.state.inputvalue} handleInput={this.handleInput} handleAdd={this.handleAdd}/>

				<ul className="list-group">
					{todosJSX}
				</ul>

				<Controls selectvalue={this.state.selectvalue} handleSelectValue={this.handleSelectValue} handleClear={this.handleClear} incompletestatus={this.state.incompletestatus}/>

			</div>
		)
	}
}

class Input extends React.Component {
	render() {
		return (
			<form>
				<div className="input-group">
					<span className="input-group-btn">
						<button onClick={this.props.handleAdd} className="btn btn-primary" type="button">Add</button>
					</span>
					<input value={this.props.inputvalue} onChange={this.props.handleInput} className="form-control" placeholder="add a todo" />
					{/*Anytime you want to trigger a method of the main component from a child component, you need to use props and pass it from the main component .*/}
				</div>
			</form>
		)
	}
}

class Controls extends React.Component {
	render() {
		return (
			<div>
				<select value={this.props.selectvalue} onChange={this.props.handleSelectValue}>
					<option value="all">all</option>
					<option value="active">active</option>
					<option value="complete">complete</option>
				</select> 

				<button onClick={this.props.handleClear} disabled={this.props.incompletestatus === true} className="pull-right btn btn-default">Clear Complete</button>
			</div>
		)
	}
}

export default ToDoApp;
