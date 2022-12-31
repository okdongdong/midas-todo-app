// stores/TodoStore.ts
import { autorun, observable, reaction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id?: string;
  content: string;
  checked: boolean;
  colorIndex: number;
}

const defaultTodos: Todo[] = [];

const TodoStore = observable(
  {
    todos: defaultTodos,

    addTodo(todo: Todo) {
      this.todos = [...this.todos, { ...todo, id: uuidv4() }];
    },

    toggleTodo(id: string) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) return { ...todo, checked: !todo.checked };
        return todo;
      });
    },

    deleteTodo(id: string) {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    },

    updateTodo(id: string, content: string, colorIndex: number) {
      this.todos = this.todos.map((todo) => {
        if (todo.id === id) return { ...todo, content, colorIndex };
        return todo;
      });
    },

    get info() {
      return {
        total: this.todos.length,
        checked: this.todos.filter((todo: Todo) => todo.checked).length,
        notChecked: this.todos.filter((todo: Todo) => !todo.checked).length,
      };
    },
  },
  {},
  { autoBind: true },
);

autorun(() => {
  TodoStore.todos = JSON.parse(localStorage.getItem('todos') || '[]');
});

reaction(
  () => TodoStore.todos,
  (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  },
);

export default TodoStore;
