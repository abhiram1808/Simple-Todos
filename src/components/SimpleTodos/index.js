import {Component} from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosList: [
      {
        id: 1,
        title: 'Book the ticket for today evening',
        completed: false,
        editing: false,
      },
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        completed: false,
        editing: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        completed: false,
        editing: false,
      },
      {
        id: 4,
        title: 'Drop the parcel at Bloomingdale',
        completed: false,
        editing: false,
      },
      {
        id: 5,
        title: 'Order fruits on Big Basket',
        completed: false,
        editing: false,
      },
      {
        id: 6,
        title: 'Fix the production issue',
        completed: false,
        editing: false,
      },
      {
        id: 7,
        title: 'Confirm my slot for Saturday Night',
        completed: false,
        editing: false,
      },
      {
        id: 8,
        title: 'Get essentials for Sunday car wash',
        completed: false,
        editing: false,
      },
    ],
    newTodoTitle: '',
    newTodoCount: 1,
  }

  handleAddTodo = () => {
    const {newTodoTitle, newTodoCount} = this.state
    const newTodos = Array.from({length: newTodoCount}, (_, i) => ({
      id: Date.now() + i,
      title: newTodoTitle,
      completed: false,
      editing: false,
    }))
    this.setState(prevState => ({
      todosList: [...prevState.todosList, ...newTodos],
      newTodoTitle: '',
      newTodoCount: 1,
    }))
  }

  handleTitleChange = e => {
    const input = e.target.value
    const parts = input.split(' ')
    const count = parseInt(parts[parts.length - 1], 10)

    if (Number.isNaN(count)) {
      const title = parts.slice(0, -1).join(' ')
      this.setState({
        newTodoTitle: title,
        newTodoCount: count,
      })
    } else {
      this.setState({
        newTodoTitle: input,
        newTodoCount: 1,
      })
    }
  }

  deleteTodo = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.filter(todo => todo.id !== id)
    this.setState({todosList: updatedTodoList})
  }

  toggleComplete = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  toggleEdit = id => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, editing: !todo.editing} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  saveTitle = (id, newTitle) => {
    const {todosList} = this.state
    const updatedTodoList = todosList.map(todo =>
      todo.id === id ? {...todo, title: newTitle, editing: false} : todo,
    )
    this.setState({todosList: updatedTodoList})
  }

  render() {
    const {todosList, newTodoTitle} = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo">
            <input
              type="text"
              value={newTodoTitle}
              onChange={this.handleTitleChange}
              placeholder="Enter todo title and number"
            />
            <button onClick={this.handleAddTodo} type="button">
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                toggleEdit={this.toggleEdit}
                saveTitle={this.saveTitle}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos
